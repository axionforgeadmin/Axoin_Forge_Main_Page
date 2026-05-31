# AXIONFORGE — Production Deploy (AWS EC2)

Architecture (single EC2, same-origin):

```
              ┌────────────── EC2 (Ubuntu) ──────────────┐
  Browser ──▶ │ nginx :80/:443                            │
              │   ├─ /            → serves frontend/dist  │
              │   └─ /api, /admin → proxy 127.0.0.1:8000  │
              │                         │ gunicorn        │
              │                         ▼ Django + DRF    │
              │                    SQLite (or Postgres)   │
              └───────────────────────────────────────────┘
                          └─ best-effort → Google Sheet
```

Because the frontend calls the **relative** `/api` (see `frontend/.env.production`),
the browser and API share one origin → no CORS needed in this setup.

---

## 0. EC2 / security group
Open inbound **22** (SSH), **80** (HTTP), **443** (HTTPS). Host: `56.228.6.74`
(`ec2-56-228-6-74.eu-north-1.compute.amazonaws.com`).

```bash
sudo apt update
sudo apt install -y python3-venv python3-pip nginx git
# Node 20 (for the frontend build)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

---

## 1. Get the code
```bash
sudo mkdir -p /srv/axionforge && sudo chown $USER /srv/axionforge
git clone <YOUR_REPO_URL> /srv/axionforge
cd /srv/axionforge
```

---

## 2. Backend
```bash
cd /srv/axionforge/backend
python3 -m venv venv
. venv/bin/activate
pip install -r requirements.txt

cp .env.example .env        # then edit .env (see below)
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser   # if you need /admin access on this box
```

### `backend/.env` (production values)
```ini
SECRET_KEY=<paste a fresh 50-char random key>     # see command below
DEBUG=False
ALLOWED_HOSTS=56.228.6.74,ec2-56-228-6-74.eu-north-1.compute.amazonaws.com
CSRF_TRUSTED_ORIGINS=http://56.228.6.74,http://ec2-56-228-6-74.eu-north-1.compute.amazonaws.com
# Same-origin frontend → CORS not required. (Add an origin only if hosted separately.)
CORS_ALLOWED_ORIGINS=
SECURE_SSL=False            # set True AFTER you add HTTPS (section 6)
DATABASE_URL=               # empty = SQLite; or postgres://user:pass@host:5432/db

# Google Sheets — paste the service-account JSON on ONE line (preferred on Linux):
GOOGLE_SHEET_ID=1BcBL_ex1C7-sROnBf4y4nK6yQec0kVkV8urNwgkK0sk
GOOGLE_SHEET_WORKSHEET=Applications
GOOGLE_SHEETS_CREDENTIALS_JSON={"type":"service_account", ... }
```
Generate a secret key:
```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```

### gunicorn service — `/etc/systemd/system/axionforge.service`
```ini
[Unit]
Description=AXIONFORGE gunicorn
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/srv/axionforge/backend
EnvironmentFile=/srv/axionforge/backend/.env
ExecStart=/srv/axionforge/backend/venv/bin/gunicorn core.wsgi:application \
  --bind 127.0.0.1:8000 --workers 3
Restart=always

[Install]
WantedBy=multi-user.target
```
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now axionforge
sudo systemctl status axionforge
```
> Note: gunicorn does not read `.env` itself — `EnvironmentFile` injects it.
> Multi-line values (the JSON key) must be a **single line** in the env file.

---

## 3. Frontend build
```bash
cd /srv/axionforge/frontend
npm ci
npm run build        # outputs frontend/dist (uses .env.production → /api)
```

---

## 4. nginx — `/etc/nginx/sites-available/axionforge`
```nginx
server {
    listen 80;
    server_name 56.228.6.74 ec2-56-228-6-74.eu-north-1.compute.amazonaws.com;

    root /srv/axionforge/frontend/dist;
    index index.html;

    # SPA: serve index.html for any non-file route
    location / {
        try_files $uri /index.html;
    }

    # API + admin → Django (gunicorn)
    location /api/   { proxy_pass http://127.0.0.1:8000; include proxy_params; }
    location /admin/ { proxy_pass http://127.0.0.1:8000; include proxy_params; }
    location /static/ { proxy_pass http://127.0.0.1:8000; }  # admin/DRF static via WhiteNoise

    client_max_body_size 5m;
}
```
```bash
sudo ln -s /etc/nginx/sites-available/axionforge /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```
Visit `http://56.228.6.74/` — the landing page; submit the form and check the row
in the DB (`/admin`) and in the Google Sheet.

---

## 5. Redeploy (after a new push)
```bash
cd /srv/axionforge && git pull
# backend
cd backend && . venv/bin/activate && pip install -r requirements.txt \
  && python manage.py migrate && python manage.py collectstatic --noinput \
  && sudo systemctl restart axionforge
# frontend
cd ../frontend && npm ci && npm run build
```

---

## 6. HTTPS (recommended before launch)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d <your-domain>      # needs a domain pointed at the EC2 IP
```
Then in `backend/.env` set `SECURE_SSL=True` and `sudo systemctl restart axionforge`.
This turns on HTTPS redirect, HSTS, and secure cookies (already wired in settings).

---

## Pre-launch checklist
- [ ] `backend/.env`: `DEBUG=False`, fresh `SECRET_KEY`, correct `ALLOWED_HOSTS`/`CSRF_TRUSTED_ORIGINS`
- [ ] `python manage.py check --deploy` → no issues
- [ ] `collectstatic` run; `/admin` loads styled
- [ ] superuser created; can view applications at `/admin`
- [ ] form submit on the live URL → row in DB **and** Google Sheet
- [ ] clear the test rows (e.g. "Sheet Live Test", "Prod Build Test") from DB + Sheet
- [ ] (if domain) HTTPS via certbot + `SECURE_SSL=True`
- [ ] service-account JSON key kept out of git (it is, via `.gitignore`)
```
