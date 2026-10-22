# Wardn AI website

Single-page marketing site for [wardnai.dev](https://wardnai.dev), built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui primitives.

## Structure

The UI follows atomic design:

- `components/atoms`: smallest brand and layout primitives
- `components/molecules`: reusable composed UI such as the integration strip and terminal
- `components/organisms`: complete landing-page sections
- `components/templates`: page composition
- `components/ui`: shadcn/ui primitives

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run lint
npm run build
```

The Next.js build produces a standalone production server.

Google Analytics is enabled only in production. It defaults to measurement ID
`G-TB10XGBRDT`, can be overridden at build time with `GOOGLE_ANALYTICS_ID`, and
defers loading until the first interaction or page exit.

## Container image

Published releases build a Linux/ARM64 image at
`ghcr.io/abhi1693/wardn-ai-website`. Like the other Wardn frontends, the image
runs the Next.js standalone server as an unprivileged Node user on port `3000`.

## Next patch release

Version 0.1.2 is prepared in [the changelog](CHANGELOG.md). Dependency updates
include the complete package locks and the tested local brace-depth security fix.
Use Node.js 26.12.1 for frontend/CLI checks. ESLint 9 and TypeScript 6 remain at
the latest versions supported by the current lint plugins.
