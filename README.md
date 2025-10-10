# DermaScan


DermaScan is a modern, AI-powered beauty and skincare web application built with Next.js. It provides users with instant analysis of their skin and facial features by leveraging Google's Gemini AI. The platform offers personalized skincare routines, beauty scores, user authentication, and a sleek, animated user interface.

## Key Features

- **AI Skin Analysis**: Upload a selfie to get a detailed analysis of skin conditions, including scores for hydration, UV damage, wrinkles, texture, pores, and more.
- **AI Beauty Analysis**: Receive a comprehensive beauty score based on facial symmetry, proportions, youthfulness indicators, and adherence to the golden ratio.
- **Personalized Routines**: Get custom-generated skincare and diet plans based on a detailed questionnaire.
- **User Authentication**: Secure sign-up, login, and password management powered by `better-auth`, supporting both email/password and Google social login.
- **Interactive UI**: A rich user experience with animations powered by Framer Motion and GSAP, built upon shadcn/ui components.
- **Subscription Tiers**: A premium pricing model for accessing advanced features, including a mock payment flow.


## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **AI**: [Google Gemini API](https://ai.google.dev/)
- **Database/ORM**: [MongoDB](https://www.mongodb.com/) with [Prisma](https://www.prisma.io/)
- **Authentication**: [better-auth](https://www.npmjs.com/package/better-auth)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Email**: [Nodemailer](https://nodemailer.com/)

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A MongoDB database instance

### 1. Clone the Repository

```bash
git clone https://github.com/shubhamjh15/DermaScan.git
cd DermaScan
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add the following environment variables. Replace the placeholder values with your actual credentials.

```env
# Prisma
DATABASE_URL="your_mongodb_connection_string"

# NextAuth / better-auth
BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Google Gemini AI
GEMINI_API_KEY="your_gemini_api_key"

# Nodemailer (for password resets and email verification)
EMAIL_SERVER_USER="your_gmail_address"
EMAIL_SERVER_APP_PASSWORD="your_gmail_app_password"
EMAIL_FROM="your_from_email_address"
EMAIL_VERIFICATION_CALLBACK_URL="http://localhost:3000/email-verified"
```

### 4. Generate Prisma Client

Run the following command to generate the Prisma client based on your schema:

```bash
npx prisma generate
```

### 5. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Project Structure

- `app/`: Contains the main application routes and pages, following the Next.js App Router structure.
  - `api/`: Houses all API route handlers for authentication, skin analysis, and beauty analysis.
  - `(pages)/`: UI pages for features like analysis, about, blog, etc.
- `components/`: Includes reusable React components.
  - `ui/`: Core UI components from shadcn/ui.
  - `pages/`: Page-specific components, like the main analysis interfaces.
  - `Auth/`: Authentication-related components like form fields and buttons.
- `lib/`: Contains utility functions, API clients, and application logic.
  - `api/`: Client-side functions for interacting with the backend API.
  - `schema/`: Zod schemas for form validation.
  - `auth.ts`: Configuration for the `better-auth` library.
- `prisma/`: Holds the database schema file (`schema.prisma`).
- `public/`: Static assets like images and fonts.

## API Endpoints

The application exposes several custom API endpoints:

- `POST /api/skin-analysis`: Accepts an image file (`analysisImage`) and returns a detailed AI skin analysis report in JSON format.
- `POST /api/beauty-analysis`: Accepts an image file (`analysisImage`) and returns a JSON object with various beauty and symmetry scores.
- `GET /api/auth/session`: A custom endpoint to check the current user's session status.
- `GET | POST /api/auth/[...all]`: Handled by `better-auth` for all authentication-related actions (e.g., sign-in, sign-out, social login callbacks).
