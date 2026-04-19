# Tech Path Finder

Tech Path Finder is a full-stack learning platform that helps students follow a structured journey through technical domains. Users can explore learning paths, watch topic-based video lectures, take MCQ quizzes, and track their progress from a personalized dashboard. Admins can manage domains, topics, and quiz content from a dedicated control panel.

## Features

- Domain-based learning paths
- Topic pages with embedded video lecture flow
- MCQ quizzes for each topic
- JWT-based authentication
- Student dashboard with progress analytics
- Personalized recommendations based on quiz performance
- Admin panel for managing domains, topics, and quizzes

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs

## Project Structure

```text
Tech-Path-Finder/
|- Frontend/   # React + Vite client
|- Backend/    # Express API + MongoDB models/controllers/routes
|- README.md
|- vercel.json
|- start-frontend.cmd
|- start-backend.cmd
|- start-project.cmd
```

## Main User Flow

1. A learner signs up or logs in.
2. The learner explores available domains on the home page.
3. Inside a domain, the learner studies topics using linked video lessons.
4. After learning, the learner takes a quiz for the topic.
5. The dashboard shows attempts, average score, and the next recommended step.

## Admin Capabilities

- Add and delete domains
- Add and delete topics
- Add quiz content for topics
- View platform content from the admin dashboard

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Tech-Path-Finder
```

### 2. Install dependencies

```bash
cd Backend
npm install
cd ../Frontend
npm install
```

### 3. Create backend environment variables

Create a `Backend/.env` file with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Run the backend

```bash
cd Backend
npm run dev
```

### 5. Run the frontend

```bash
cd Frontend
npm run dev
```

The frontend is configured to call the backend at:

```text
http://localhost:5000/api
```

## Available Scripts

### Backend

- `npm run dev` - start backend with nodemon
- `npm start` - start backend with Node.js

### Frontend

- `npm run dev` - start Vite dev server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## API Overview

The backend exposes routes under `/api` for:

- `/auth` - register, login, current user
- `/domains` - domain listing and admin management
- `/topics` - topic listing by domain and admin management
- `/questions` - quiz question management
- `/quiz` - quiz submission and attempt history
- `/analytics` - progress summary and recommendations

## Deployment

The repository includes a `vercel.json` file for deployment with:

- Frontend served from `Frontend`
- Backend served from `Backend`

## Current Status

This project already includes the core full-stack learning workflow:

- student authentication
- domain exploration
- topic-based learning
- quiz attempts
- progress tracking
- recommendation logic
- admin content management

## Future Improvements

- Role-based UI refinements for admin and students
- Better quiz review and answer explanations
- Search and filtering for domains/topics
- Richer analytics and progress history
- Image uploads or thumbnails for learning paths

## Author

Built as a MERN-style learning platform project for guided tech education.
