# 🌟 Premium MERN Stack Todo Application

A heavily animated, uniquely designed, full-stack Todo application built with the MERN stack (MongoDB, Express, React, Node.js).

> **Designed & Engineered by Harshil Chavda** as part of the Naviotech Solution Pvt. Ltd internship program.

---

## ✨ Outstanding Features & UI Enhancements

I went above and beyond the standard CRUD requirements to create a truly premium user experience:

- **Cinematic Glassmorphism UI:** A deep, radial gradient background with "frosted glass" layered panels, glowing borders, and stunning neon text effects.
- **Kanban-Style Dashboard:** Tasks are automatically organized into three distinct, side-by-side columns: **🚀 New**, **✅ Completed**, and **🗑️ Deleted**.
- **Advanced Framer Motion Animations:**
  - Spring-loaded staggered entrance texts.
  - Layout transitions: Additions and deletions seamlessly glide the surrounding elements without snapping.
  - Hover Physics: Buttons and cards realistically scale, rotate, and emit neon shadows on hover and click.
- **Custom Interactive Cursor:** A completely custom, React-driven animated cursor that elegantly morphs and expands when hovering over interactive elements.
- **Smart "Soft" Deletion:** Clicking delete doesn't permanently destroy data; it moves it to a "Recycle Bin" column where it can easily be **♻️ Restored**.
- **Priority System:** Every task can be assigned a priority (`High`, `Medium`, `Low`), complete with customized color-coded badges.
- **Automated Timestamps:** The app dynamically tracks and displays when a task was _Created_, _Completed_, or _Deleted_.

---

## 🛠️ Technology Stack Breakdown

| Layer           | Tools Used                | Purpose                                                            |
| :-------------- | :------------------------ | :----------------------------------------------------------------- |
| **Frontend**    | React.js (Vite), CSS Grid | High-performance, reactive user interface with complex layouts.    |
| **Animations**  | Framer Motion             | Physics-based animations, layout transitions, and cursor tracking. |
| **Backend API** | Node.js, Express.js       | Robust RESTful routing handling data manipulation.                 |
| **Database**    | MongoDB, Mongoose         | Persistent NoSQL data storage with advanced schemas.               |

---

## 📂 Project Architecture

```
MERN Stack Website/
├── backend/
│   ├── models/
│   │   └── Todo.js            # Mongoose Schema (Title, Priority, Timestamps, Deleted Flags)
│   ├── routes/
│   │   └── todos.js           # REST API Endpoints (Soft-Deletes, Status Toggling)
│   ├── .env                   # Configuration Variables
│   └── server.js              # Express Entry Point
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TodoItem.jsx   # Individual animated task card
    │   │   └── CustomCursor.jsx # Logic for the custom floating cursor
    │   ├── App.jsx            # Main Dashboard & State Control
    │   └── App.css            # Advanced Glassmorphism & Grid Styles
    └── package.json
```

---

## 🚀 How to Run the Project Locally

To run this application, you must have **[Node.js](https://nodejs.org/)** and **[MongoDB Community Server](https://www.mongodb.com/try/download/community)** installed and running on your machine.

### 1. Start the Backend Server

Open your terminal, navigate to the backend directory, and run the server.

```bash
cd "MERN Stack Website/backend"
npm install
npm run dev
```

_(You should see a message confirming the server is running on port 5000 and successfully connected to MongoDB)._

### 2. Start the Frontend Application

Open a **new, second terminal window**, navigate to the frontend directory, and start Vite.

```bash
cd "MERN Stack Website/frontend"
npm install
npm run dev
```

### 3. Experience the App

Open your web browser and navigate to:
**👉 http://localhost:5173**

---

_Project submitted for review on March 10th, 2026._
