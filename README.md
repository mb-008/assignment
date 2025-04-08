# Notification System
A modern notification panel built with MERN stack (MongoDB, Express, React, Node.js) featuring real-time updates and a clean user interface.

## 🛠️ Setup
### Backend Setup
On Terminal run the commands :-
   1. cd backend
   2. npm install
   3. node server.js 
## Server will run on http://localhost:5000

### Frontend Setup
On Terminal run the commands :-
   1. cd frontend
   2. npm install
   3. npm run dev 
## Server will run on http://localhost:5173

## Database Seeding (Mock Data)
On Terminal run the command :-

curl http://localhost:5000/api/seed

## Development

Backend API: http://localhost:5000

Frontend: http://localhost:5173

### API Documentation:

GET /api/notifications - Get all notifications

PATCH /api/notifications/:id/read - Mark as read

PATCH /api/notifications/read-all - Mark all as read


