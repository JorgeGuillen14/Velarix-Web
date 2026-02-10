# Revert to Original Tech Stack (pre-Webflow)

To return to the original setup (Vercel, local dev, no Webflow-specific config):

## 1. Remove Webflow config

```bash
rm webflow.json
```

## 2. Remove Webflow env vars

- In Webflow Cloud: remove `NEXT_PUBLIC_BASE_PATH` from environment variables (if set).
- In `.env.local`: remove any `NEXT_PUBLIC_BASE_PATH=` line.

When `NEXT_PUBLIC_BASE_PATH` is unset, `basePath` and `assetPrefix` default to `""`, restoring the original behavior.

## 3. No code changes needed

`next.config.ts` and the request-demo fetch already use `process.env.NEXT_PUBLIC_BASE_PATH ?? ""`, so without that env var the app behaves exactly as before Webflow.

## Summary

- **Original stack**: No `webflow.json`, no `NEXT_PUBLIC_BASE_PATH` → app runs at root (`/`).
- **Webflow stack**: Keep `webflow.json`, set `NEXT_PUBLIC_BASE_PATH=/app` (or your mount path) in Webflow env vars.
