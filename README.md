# My Blog

![App Preview](https://imgix.cosmicjs.com/39040a40-3e83-11f1-9518-85dcf0d76180-autopilot-photo-1540189549336-e6e99c3679fe-1776886874314.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, dark-themed blog built with Next.js 16 and Cosmic CMS.

## Features

- 📝 Dynamic blog posts with rich content
- 👤 Author profiles with social links
- 🏷️ Color-coded category system
- 🎨 Dark modern UI design
- 📱 Fully responsive
- ⚡ Server-side rendering for performance
- 🔍 SEO-friendly

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69e9240d8a9355b61761d9b7&clone_repository=69e924f08a9355b61761dac0)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories."

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Blog". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) - React framework with App Router
- [Cosmic CMS](https://www.cosmicjs.com/docs) - Headless CMS
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Bun](https://bun.sh) - Fast package manager

## Getting Started

### Prerequisites

- Bun installed
- Cosmic account with bucket set up

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```
3. Set up environment variables (automatically provided)
4. Run the development server:
```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetching posts with author and category
const response = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three content types:
- **Posts**: Blog articles with featured images, tags, author, and category
- **Authors**: Writer profiles with bio and social links
- **Categories**: Topic categories with custom colors

## Deployment Options

Deploy to Vercel or Netlify. Set environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`.

<!-- README_END -->