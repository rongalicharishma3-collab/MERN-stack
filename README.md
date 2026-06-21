# Explore Vizag

Explore Vizag is a full-stack MERN tourism platform for Visakhapatnam. Guests can discover attractions and events, then generate a personalized trip plan. Registered users can review places, save favorites, and manage itineraries. Admins can manage platform content and view analytics.

## Tech Stack

- Frontend: React, Vite, React Router DOM, Axios, Tailwind CSS, Context API
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB Atlas
- Authentication: JWT and bcrypt
- Image Uploads: Cloudinary

## Project Structure

```text
Explore-Vizag/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      seed/
      utils/
      app.js
      server.js
  frontend/
    src/
      components/
      context/
      pages/
      services/
      App.jsx
      main.jsx
      index.css
```

## Local Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Backend runs on `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Required Environment Variables

Backend `.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/explore-vizag
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Demo Accounts After Seeding

- Admin: `admin@explorevizag.com` / `Admin@123`
- User: `user@explorevizag.com` / `User@123`

## Trip Planner

The frontend includes a form-based Trip Planner where users can enter personal details, dates, places to visit, transport mode, guide requirement, and accommodation preference. It generates a clean day-wise plan and authenticated users can save it to My Itineraries.

## Deployment

### Backend

Deploy the `backend` folder to Render, Railway, Fly.io, or a Node-capable VPS.

Set production environment variables:

- `NODE_ENV=production`
- `MONGO_URI`
- `JWT_SECRET`
- `CLOUDINARY_*`
- `CLIENT_URL`

Start command:

```bash
npm start
```

### Frontend

Deploy the `frontend` folder to Vercel, Netlify, or Cloudflare Pages.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Set `VITE_API_URL` to your deployed backend API URL.

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).
