# Run Loupe in VS Code

This zip has already been arranged for local VS Code development.

## Folder structure included

- `package.json` renamed from `package(2).json`
- `README.md` renamed from `README(3).md`
- `.env.example` renamed from `.env(2).example`
- `.vscode/launch.json` moved into the VS Code config folder
- Design-system files moved into the path expected by `Loupe.dc.html`:
  - `_ds/brief-design-system-8e53f4d0-5f0b-438d-b593-a25d993afec7/styles.css`
  - `_ds/brief-design-system-8e53f4d0-5f0b-438d-b593-a25d993afec7/_ds_bundle.js`
  - `_ds/brief-design-system-8e53f4d0-5f0b-438d-b593-a25d993afec7/tokens/*.css`

## Steps

1. Open this folder in VS Code.
2. In the VS Code terminal, run:

```bash
npm install
```

3. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

4. Fill in your Canva credentials in `.env`.

For local development, use:

```env
CANVA_REDIRECT_URI=http://127.0.0.1:8787/auth/canva/callback
APP_ORIGIN=http://localhost:8080
PORT=8787
NODE_ENV=development
```

5. Start the backend:

```bash
npm run dev
```

6. Serve `Loupe.dc.html` on port `8080`, for example with the VS Code Live Server extension.

7. In Loupe settings, set the backend URL to:

```text
http://localhost:8787
```

8. Click **Connect Canva account**.

## Notes

Make sure your Canva Developer integration redirect URL exactly matches:

```text
http://127.0.0.1:8787/auth/canva/callback
```
