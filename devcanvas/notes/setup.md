# Setup and how to run

## Requirements

- Python 3 with `venv` (the project is pinned to Django 6.0, which needs a recent Python 3).
- Dependencies from `requirements.txt`: `Django==6.0`, `pillow==12.0.0` (image uploads), `python-decouple==3.8` (settings from environment), plus `asgiref`, `sqlparse` and `tzdata`.
- No other services: the database is a local SQLite file.

## Run locally

```bash
python3 -m venv venv
source venv/bin/activate
python -m pip install -r requirements.txt
```

Create a `.env` file at the repository root (it is git-ignored). `settings.py` reads these two variables with `python-decouple`:

```
SECRET_KEY=<a long random string>
DEBUG=True
```

`DEBUG` defaults to `False` when it is missing. With `DEBUG=False`, Django does not serve static or media files by itself.

Then prepare the database and start the server:

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

- Public menu: <http://127.0.0.1:8000/>
- Admin panel: <http://127.0.0.1:8000/admin/>

The repository README gives the same commands for Windows PowerShell (`.\venv\Scripts\Activate.ps1`).

## Add content

The menu is empty until data exists. In the admin:

1. Create one or more **Categorías**. `orden` controls their order and `activa` hides a whole category.
2. Create **Platos** and assign each to a category. Upload an image if you have one; the form shows a live preview and lets you crop the image to 4:3.
3. Tick **Destacado** to show a dish in the "Platos Preferidos" carousel, and untick **Disponible** to hide it from the menu.

## Useful commands

```bash
python manage.py check              # validate the project
python manage.py makemigrations     # after changing models
python manage.py migrate
python manage.py test               # runs tests; currently there are none
python manage.py collectstatic      # fills staticfiles/ for production
```

## Production notes

What the repository shows about deployment:

- `settings.py` allows the `playero3.win` domain (and subdomains) in `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS`.
- `STATIC_ROOT` is `staticfiles/` and `MEDIA_ROOT` is `media/`, so a web server in front of Django must serve both, because `DEBUG=False` disables Django's own file serving.
- A Gunicorn socket (`gunicorn_playero.sock`) is git-ignored, which suggests Gunicorn is used on the server. Gunicorn is **not** in `requirements.txt`, and the repository has no deployment config (service unit, proxy config), so the exact production setup is not documented here.
- `db.sqlite3`, `media/`, `staticfiles/` and `.env` are git-ignored, so they must be backed up and provisioned separately.
