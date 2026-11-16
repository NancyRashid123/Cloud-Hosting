
# ☁️ Cloud Hosting — Article Management Platform

A full-stack article management platform built with **Next.js**, where users can register, sign in, browse and search articles, while administrators manage platform content through a dedicated admin area.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://cloud-hosting-eight.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)

## ✨ Features

### Authentication & Access Control

- User registration and login.
- Password hashing with bcrypt.
- JWT-based authentication using cookies.
- Protected application routes and access control.

### Article Management

- Create, read, update, and delete articles.
- Browse and search articles.
- Paginated article listing.

### Administration & User Experience

- Dedicated admin area for content management.
- Form handling and validation using Formik and Yup.
- Zod schema validation where used in the application.
- Toast notifications for user feedback.

## 🧰 Tech Stack

| Area | Technologies |
|---|---|
| Framework | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT, Cookies, bcryptjs |
| Forms & Validation | Formik, Yup, Zod |
| HTTP Client | Axios |
| UI Feedback | react-hot-toast |
| Deployment | Vercel |

## 🔐 Authentication Overview

1. A user submits the login form.
2. The application verifies the credentials.
3. Passwords are handled using bcrypt-based hashing.
4. The authentication token is stored in a cookie.
5. Protected routes check authentication before allowing access.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- A PostgreSQL database.

### Installation

```bash
git clone https://github.com/NancyRashid123/Cloud-Hosting.git
cd Cloud-Hosting
npm install
```


## Environment Configuration

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
NODE_ENV="development"
```

Replace the placeholder values with your actual configuration.



### Database Setup

Generate the Prisma Client:

```bash
npx prisma generate
```

For a fresh database, review the Prisma schema and project configuration before applying the database setup workflow.

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

## ☁️ Deployment

Deployed on Vercel:

[Live Demo](https://cloud-hosting-eight.vercel.app/)

Configure the required database connection and authentication environment variables in the Vercel project settings.

## 👩‍💻 Author

**Nancy Rashid**

[GitHub](https://github.com/NancyRashid123)

[Repository](https://github.com/NancyRashid123/Cloud-Hosting)


