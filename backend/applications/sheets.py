"""Best-effort Google Sheets sync for applications.

A submitted application is always saved to the database first; mirroring it to a
Google Sheet is a non-critical side effect. Every function here swallows its own
errors and returns a bool so a Google outage / misconfig can never break the API
or lose an applicant.

Config (all via env / settings):
  GOOGLE_SHEETS_CREDENTIALS   path to the service-account JSON key file
  GOOGLE_SHEETS_CREDENTIALS_JSON   (alt) the JSON key contents inline
  GOOGLE_SHEET_ID             the target spreadsheet's ID (from its URL)
  GOOGLE_SHEET_WORKSHEET      worksheet/tab name (default "Applications")

If GOOGLE_SHEET_ID is unset, syncing is silently disabled (DB-only mode).
"""
import json
import logging
import threading

from django.conf import settings

logger = logging.getLogger(__name__)

_SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
_HEADER = ["Timestamp", "Name", "Email", "Phone", "College", "Program"]

_lock = threading.Lock()
_worksheet = None          # cached gspread worksheet
_init_failed = False       # don't retry a hard config failure every request


def _get_worksheet():
    """Return a cached gspread worksheet, or None if syncing is disabled/broken."""
    global _worksheet, _init_failed

    if _worksheet is not None:
        return _worksheet
    if _init_failed:
        return None

    sheet_id = getattr(settings, "GOOGLE_SHEET_ID", "") or ""
    if not sheet_id:
        return None  # feature disabled — not an error

    with _lock:
        if _worksheet is not None:
            return _worksheet
        if _init_failed:
            return None
        try:
            import gspread
            from google.oauth2.service_account import Credentials

            cred_json = getattr(settings, "GOOGLE_SHEETS_CREDENTIALS_JSON", "") or ""
            cred_path = getattr(settings, "GOOGLE_SHEETS_CREDENTIALS", "") or ""
            if cred_json:
                info = json.loads(cred_json)
                creds = Credentials.from_service_account_info(info, scopes=_SCOPES)
            elif cred_path:
                creds = Credentials.from_service_account_file(cred_path, scopes=_SCOPES)
            else:
                logger.warning("Google Sheet ID set but no service-account credentials provided; disabling sync.")
                _init_failed = True
                return None

            client = gspread.authorize(creds)
            spreadsheet = client.open_by_key(sheet_id)

            ws_name = getattr(settings, "GOOGLE_SHEET_WORKSHEET", "") or "Applications"
            try:
                ws = spreadsheet.worksheet(ws_name)
            except gspread.WorksheetNotFound:
                ws = spreadsheet.add_worksheet(title=ws_name, rows=1000, cols=len(_HEADER))
                ws.append_row(_HEADER, value_input_option="USER_ENTERED")

            # ensure a header row exists on a fresh/empty sheet
            try:
                if not ws.row_values(1):
                    ws.append_row(_HEADER, value_input_option="USER_ENTERED")
            except Exception:  # header check is best-effort
                pass

            _worksheet = ws
            logger.info("Google Sheets sync ready (sheet=%s, worksheet=%s).", sheet_id, ws_name)
            return _worksheet
        except Exception:
            logger.exception("Failed to initialize Google Sheets client; disabling sync.")
            _init_failed = True
            return None


def append_application(application) -> bool:
    """Append one Application as a row. Never raises. Returns True on success."""
    try:
        ws = _get_worksheet()
        if ws is None:
            return False
        ws.append_row(
            [
                application.created_at.isoformat(),
                application.name,
                application.email,
                application.phone,
                application.college or "",
                application.program,
            ],
            value_input_option="USER_ENTERED",
        )
        return True
    except Exception:
        logger.exception("Could not append application %s to Google Sheet.", getattr(application, "id", "?"))
        return False
