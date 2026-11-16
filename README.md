# Cloud Hosting — Article Management Platform

A content-management platform where users can create accounts, sign in, browse articles, search content, and manage articles through an administrative area.

## Live Demo

[Open Cloud Hosting](https://cloud-hosting-eight.vercel.app/)

## Features

- User registration and login.
- Secure password hashing with bcrypt.
- Token-based authentication using JWT and HTTP cookies.
- Protected routes and authenticated user access.
- Article creation, reading, updating, and deletion workflows.
- Article search and paginated listing.
- Admin panel for managing platform content.
- Form validation with Formik, Yup, and Zod in the relevant forms/flows.
- Toast notifications for user feedback.
- PostgreSQL database access through Prisma ORM.

## Tech Stack

- **Framework:** Next.js App Router, React, TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL, Prisma ORM
- **Authentication:** JWT, HTTP Cookies, bcryptjs
- **Forms & Validation:** Formik, Yup, Zod
- **HTTP Client:** Axios
- **UI Feedback:** react-hot-toast
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js
- npm
- A PostgreSQL database

### Installation

```bash
git clone https://github.com/NancyRashid123/Cloud-Hosting.git
cd Cloud-Hosting
npm install
```

### Environment Variables

Create a `.env` file and configure the PostgreSQL connection string and JWT secret required by the application. Use the exact variable names referenced in the project code, and do not commit secrets.

### Database Setup

Configure the database connection, then run the Prisma command used by your local project setup to synchronize the schema.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

## Deployment

The application is deployed on Vercel: [cloud-hosting-eight.vercel.app](https://cloud-hosting-eight.vercel.app/).

## Author

**Nancy Rashid**  
[GitHub Profile](https://github.com/NancyRashid123)

