"""API tests for the public application-intake endpoint.

GOOGLE_SHEET_ID is overridden to "" so tests never write to the real Sheet, and
Django uses a throwaway test database so the real db.sqlite3 is untouched.
"""
import json

from django.test import TestCase, override_settings
from django.urls import reverse

from .models import Application
from . import sheets


@override_settings(GOOGLE_SHEET_ID="")
class ApplicationAPITests(TestCase):
    def setUp(self):
        self.url = reverse("application-create")

    def _post(self, payload):
        return self.client.post(self.url, data=json.dumps(payload), content_type="application/json")

    def test_valid_application_creates_row(self):
        res = self._post({
            "name": "Asha Rao", "email": "asha@example.com",
            "phone": "9876543210", "college": "REC", "program": "signature",
        })
        self.assertEqual(res.status_code, 201)
        self.assertEqual(Application.objects.count(), 1)
        app = Application.objects.get()
        self.assertEqual(app.name, "Asha Rao")
        self.assertEqual(app.program, "signature")
        self.assertIn("message", res.json())

    def test_college_is_optional(self):
        res = self._post({
            "name": "No College", "email": "nc@example.com",
            "phone": "9000000000", "program": "apply",
        })
        self.assertEqual(res.status_code, 201)
        self.assertEqual(Application.objects.get().college, "")

    def test_missing_required_fields_returns_400(self):
        res = self._post({"college": "X"})
        self.assertEqual(res.status_code, 400)
        body = res.json()
        for field in ("name", "email", "phone"):
            self.assertIn(field, body)
        self.assertEqual(Application.objects.count(), 0)

    def test_invalid_email_returns_400(self):
        res = self._post({"name": "Bad", "email": "not-an-email", "phone": "1", "program": "basic"})
        self.assertEqual(res.status_code, 400)
        self.assertIn("email", res.json())

    def test_invalid_program_enum_returns_400(self):
        res = self._post({"name": "X", "email": "x@y.com", "phone": "1", "program": "gold"})
        self.assertEqual(res.status_code, 400)
        self.assertIn("program", res.json())
        self.assertEqual(Application.objects.count(), 0)

    def test_get_is_method_not_allowed(self):
        self.assertEqual(self.client.get(self.url).status_code, 405)

    def test_post_succeeds_with_sheets_disabled(self):
        # With GOOGLE_SHEET_ID="" the sheet write is skipped; the API must still 201.
        res = self._post({"name": "S", "email": "s@y.com", "phone": "1", "program": "premium"})
        self.assertEqual(res.status_code, 201)


class SheetsFailSafeTests(TestCase):
    @override_settings(GOOGLE_SHEET_ID="")
    def test_append_returns_false_when_disabled_and_never_raises(self):
        app = Application.objects.create(name="N", email="n@y.com", phone="1", program="apply")
        # Must not raise, and returns False because syncing is disabled.
        self.assertIs(sheets.append_application(app), False)
