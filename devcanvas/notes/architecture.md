# Architecture

Playero Web is a standard Django 6.0 project with one project package and one app.
The UI text of the site and the admin is in Spanish (`LANGUAGE_CODE = 'es-cl'`,
`TIME_ZONE = 'America/Santiago'`).

## Layout

| Path | Purpose |
|---|---|
| `manage.py` | Django management entry point |
| `playero/` | Project package: `settings.py`, `urls.py`, `wsgi.py`, `asgi.py` |
| `restaurante/` | The only app: models, admin, views, templates, static files |
| `requirements.txt` | Pinned dependencies |
| `media/` | User uploads (dish images); ignored by git |
| `staticfiles/` | Output of `collectstatic`; ignored by git |
| `db.sqlite3` | SQLite database; ignored by git |

## Project package (`playero/`)

- **Installed apps:** the default Django contrib apps plus `restaurante`.
- **Database:** SQLite at `BASE_DIR / 'db.sqlite3'`.
- **Configuration:** `python-decouple` reads `DEBUG` (default `False`) and the secret key from the environment or a local `.env` file, which is not committed.
- **Hosts:** `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS` include `localhost`, `127.0.0.1`, a LAN address and the `playero3.win` domain with its subdomains.
- **Static and media:** `STATIC_URL = '/static/'`, `STATIC_ROOT = staticfiles/`, `MEDIA_ROOT = media/`.
- **No custom middleware or context processors** beyond the Django defaults.

## URLs

| URL | Name | View |
|---|---|---|
| `/` | `restaurante:menu` | `restaurante.views.menu` |
| `/admin/` | `admin:index` | Django admin |

`playero/urls.py` includes `restaurante.urls` at the site root. When `DEBUG` is on, it also serves `MEDIA_URL` from `MEDIA_ROOT`.

## Models (`restaurante/models.py`)

### `Categoria`

A group of dishes (starters, fish, soups, drinks...).

| Field | Type | Notes |
|---|---|---|
| `nombre` | `CharField(100)` | unique |
| `descripcion` | `TextField` | optional |
| `orden` | `IntegerField` | display order, default `0` |
| `activa` | `BooleanField` | default `True` |
| `created_at`, `updated_at` | `DateTimeField` | automatic |

Ordered by `orden`, then `nombre`.

### `Plato`

A dish on the menu.

| Field | Type | Notes |
|---|---|---|
| `nombre` | `CharField(200)` | |
| `descripcion` | `TextField` | optional |
| `categoria` | `ForeignKey(Categoria)` | `related_name='platos'`, cascade delete |
| `precio` | `DecimalField(10, 2)` | minimum `0.01` |
| `imagen` | `ImageField` | uploaded to `media/platos/`, optional |
| `disponible` | `BooleanField` | default `True` |
| `destacado` | `BooleanField` | default `False`; featured in the carousel |
| `created_at`, `updated_at` | `DateTimeField` | automatic |

Ordered by `categoria`, then `nombre`. There is a single migration, `0001_initial`.

## View (`restaurante/views.py`)

`menu(request)` builds the page context:

- `platos_destacados`: dishes with `destacado=True` and `disponible=True`.
- `categorias`: active categories ordered by `orden` and `nombre`, each one with a `platos_disponibles` attribute holding its available dishes.

It renders `restaurante/menu.html`. Categories without available dishes are skipped in the template.

## Admin (`restaurante/admin.py`)

- `CategoriaAdmin`: list display, filters and search on name and description.
- `PlatoAdmin`: list with `disponible` and `destacado` editable inline, filters by category, availability and date, and the form split into fieldsets (information, image, state).
- **Dish preview and cropper:** `templates/admin/restaurante/plato/change_form.html` overrides the change form to show a live preview card of the dish. `static/restaurante/js/admin-preview.js` updates it as the user types and uses Cropper.js (from cdnjs) to crop the uploaded image to a 4:3 area, exported as an 800x600 JPEG named `plato-recortado.jpg`.
- **Branding:** `templates/admin/base_site.html` sets the admin title ("Panel Administración Playero 3"), logo and favicon, plus `static/admin/css/custom-admin.css`.

## Templates (`restaurante/templates/`)

- `restaurante/base.html`: base layout. Loads the Nanum Gothic font from Google Fonts, Bootstrap 5.3 CSS and JS from jsDelivr, and the app's `style.css` and `main.js`.
- `restaurante/menu.html`: the menu page. A hamburger button opens a side menu with anchors to each section; below it the logo with hero background, the featured-dishes carousel (Bootstrap) and one grid of dish cards per category.
- `admin/base_site.html` and `admin/restaurante/plato/change_form.html`: admin overrides described above.

## Static assets (`restaurante/static/`)

- `restaurante/css/style.css`: dark theme with a gold accent, responsive layout for the menu.
- `restaurante/js/main.js`: side menu, smooth scrolling to sections, fade-in of dish cards on scroll (`IntersectionObserver`) and thousands-separator formatting of prices (`12.500`).
- `restaurante/css/admin-preview.css`, `restaurante/js/admin-preview.js`: dish preview and cropper for the admin.
- `restaurante/images/`: `logoPlayero.png`, `hero.jpg`, `favicon.ico`.
- `admin/css/custom-admin.css`, `admin/img/`: admin branding.

## Things worth knowing

- `static/admin/css/admin-preview.css` and `static/admin/js/admin-preview.js` are older copies of the files under `static/restaurante/`. The admin template loads the `restaurante/` versions, and the `admin/` JS copy lacks the thousands-separator price formatting.
- `admin/base_site.html` links `admin/img/favicon.png`, which is not in the repository (only `favicon.ico` and `logo.png` are).
- `tests.py` is the empty Django stub: there are no automated tests yet.
- `MEDIA_URL` is set to `'media/'` without a leading slash, while `STATIC_URL` is `'/static/'`.
