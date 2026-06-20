# MERN Task Manager

A full-stack task-management application built with MongoDB, Express, React, and Node.js. It supports task priorities, completion tracking, editing, soft deletion, restoration, and an animated responsive interface.

## Features

- Create, edit, complete, and restore tasks
- Assign high, medium, or low priority
- Separate active, completed, and deleted task views
- Preserve deleted tasks through soft deletion
- Record creation, completion, and deletion timestamps
- Animate state and layout changes with Framer Motion
- Persist application data in MongoDB

## Technology

- **Frontend:** React, Vite, Framer Motion, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **API:** REST endpoints for task creation, retrieval, updates, and soft deletion

## Project structure

```text
MERN-TODO-LIST-Website/
├── backend/
│   ├── models/          Mongoose data models
│   ├── routes/          Express API routes
│   ├── package.json
│   └── server.js        API and database entry point
├── frontend/
│   ├── public/
│   ├── src/             React application
│   └── package.json
└── README.md
```

## Run locally

### Prerequisites

- Node.js 20 or newer
- npm
- A local MongoDB server or MongoDB Atlas connection

### Backend

Create `backend/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/task-manager
PORT=5000
```

Install dependencies and start the API:

```bash
cd backend
npm install
npm run dev
```

### Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## API routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/todos` | List tasks |
| `POST` | `/api/todos` | Create a task |
| `PUT` | `/api/todos/:id` | Edit, complete, or restore a task |
| `DELETE` | `/api/todos/:id` | Soft-delete a task |

## Planned improvements

- Read the frontend API URL from an environment variable
- Add request validation and automated tests
- Add authentication and per-user task ownership
- Deploy the frontend, API, and managed database

## Author

Developed by [Harshil Chavda](https://github.com/Harshil-Chavda).
