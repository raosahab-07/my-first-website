# AI-Powered Full-Stack Portfolio

Professional, production-ready portfolio built with the MERN stack, Next.js 14, and AI integrations.

## 🚀 Features
- **AI Resume Analyzer**: Instant recruiter-level feedback on your resume text.
- **Smart Analytics**: Dashboard tracking for visitors, messages, and engagement.
- **Full CRUD Admin Panel**: Securely manage projects, skills, and messages.
- **Premium UI**: Apple-inspired Light Mode & Futuristic Dark Mode with Glassmorphism.
- **Secure Auth**: JWT-based admin authentication with bcrypt encryption.

## 🛠️ Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Node.js, Express, Mongoose, JWT, Nodemailer.
- **Database**: MongoDB.
- **AI**: OpenAI API integration.

## 📦 Setup Instructions

### 1. Prerequisite
Ensure you have Node.js and MongoDB installed.

### 2. Environment Variables
Create a `.env` file in the `server` directory based on `server/env.example`.

### 3. Installation
Run the following from the root directory:
```bash
npm install
npm run install-all
```

### 4. Running the App
To start both the client and server concurrently:
```bash
npm start
```
- Frontend: `http://localhost:3000`
- API Server: `http://localhost:5000`
- Admin Panel: `http://localhost:3000/admin`

## 📂 Project Structure
- `/client`: Next.js frontend application.
- `/server`: Node.js/Express API backend.
- `/legacy`: Original static HTML/CSS files for reference.

## 🛡️ Security Note
All admin routes are protected via JWT middleware. Image uploads are handled securely (ready for Cloudinary integration).
