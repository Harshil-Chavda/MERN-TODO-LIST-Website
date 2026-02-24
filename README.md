# ✨ Harshil's Premium MERN Task Manager

A beautifully designed, heavily animated, full-stack Todo application built with the MERN stack (MongoDB, Express, React, Node.js).

> **Designed, Engineered, and Conceptualized by Harshil Chavda** as part of the Naviotech Solution Pvt. Ltd internship program.

---

## 🌟 Outstanding Features & UI Enhancements

I went above and beyond the standard CRUD requirements to create a truly premium, interactive user experience:

- **Cinematic Glassmorphism UI:** A deep, radial gradient background with "frosted glass" layered panels, glowing borders, and stunning neon text effects.
- **Dynamic Tabbed Navigation:** Tasks are intelligently organized into three switchable tabs: **🚀 New**, **✅ Completed**, and **🗑️ Deleted**. This keeps the interface clean and focused.
- **Custom OS-Level Themed Cursors:** The default Windows/Mac cursors have been completely replaced with custom SVG graphics that match the app's dark purple and neon blue aesthetic with zero lag.
- **Advanced Framer Motion Animations:**
  - Spring-loaded staggered entrance texts.
  - Layout transitions: Additions and deletions seamlessly glide the surrounding elements without snapping.
  - Hover Physics: Buttons and cards realistically scale, rotate, and emit glowing shadows on hover and click.
- **Smart "Soft" Deletion:** Clicking delete doesn't permanently destroy data; it moves it to a "Recycle Bin" tab where it can easily be **♻️ Restored**.
- **Priority System:** Every task can be assigned a priority (`High`, `Medium`, `Low`), complete with customized color-coded badges.
- **Automated Timestamps:** The app dynamically tracks and displays when a task was _Created_, _Completed_, or _Deleted_.

---

## 🛠️ Technology Stack Breakdown

| Layer           | Tools Used                   | Purpose                                                             |
| :-------------- | :--------------------------- | :------------------------------------------------------------------ |
| **Frontend**    | React.js (Vite), CSS Flexbox | High-performance, reactive user interface with complex tab layouts. |
| **Animations**  | Framer Motion                | Physics-based animations, layout transitions.                       |
| **Backend API** | Node.js, Express.js          | Robust RESTful routing handling data manipulation.                  |
| **Database**    | MongoDB, Mongoose            | Persistent NoSQL data storage with advanced schemas.                |

---

## 📂 Project Architecture

```
MERN-TODO-LIST-Website/
├── backend/
│   ├── models/
│   │   └── Todo.js            # Mongoose Schema (Title, Priority, Timestamps, Deleted Flags)
│   ├── routes/
│   │   └── todos.js           # REST API Endpoints (Soft-Deletes, Status Toggling)
│   ├── .env                   # Configuration Variables (IPv4 routing fix)
│   └── server.js              # Express Entry Point
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── TodoItem.jsx   # Individual animated task card
    │   ├── App.jsx            # Main Dashboard, Tab State Control
    │   └── App.css            # Advanced Glassmorphism & SVG Cursors
    └── package.json
```

---

## 🚀 How to Run the Project Locally

To run this application, you must have **[Node.js](https://nodejs.org/)** and **[MongoDB Community Server](https://www.mongodb.com/try/download/community)** installed and running on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Harshil-Chavda/MERN-TODO-LIST-Website.git
```

### 2. Start the Backend Server

Open your terminal, navigate to the backend directory, and run the server.

```bash
cd "MERN-TODO-LIST-Website/backend"
npm install
npm run dev
```

_(You should see a message confirming the server is running on port 5000 and successfully connected to MongoDB)._

### 3. Start the Frontend Application

Open a **new, second terminal window**, navigate to the frontend directory, and start Vite.

```bash
cd "MERN-TODO-LIST-Website/frontend"
npm install
npm run dev
```

### 4. Experience the App

Open your web browser and navigate to:
**👉 http://localhost:5173**

---

_Project conceptualized and executed by Harshil Chavda. March 2026._
