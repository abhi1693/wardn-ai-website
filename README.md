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

## Container image

Published releases build a Linux/ARM64 image at
`ghcr.io/abhi1693/wardn-ai-website`. Like the other Wardn frontends, the image
runs the Next.js standalone server as an unprivileged Node user on port `3000`.
