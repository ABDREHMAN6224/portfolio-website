# abdrehman.me

Personal portfolio of Abdul Rehman Memon: Full Stack & AI Engineer.

Built with Next.js (App Router, static export), TypeScript, Tailwind CSS v4 and Motion. Deployed on Netlify.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
npm run typecheck
```

## Editing content

All copy (profile, experience, case studies, projects, skills) lives in [`src/content/site.ts`](src/content/site.ts). Components only render it. The CV served by the "Download CV" button is [`public/cv.pdf`](public/cv.pdf).

## Contact form

The form sends through EmailJS when these are set (locally in `.env.local`, in production as Netlify environment variables):

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

Without them, it falls back to opening the visitor's mail client.
