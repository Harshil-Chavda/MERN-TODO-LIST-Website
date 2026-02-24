import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import TodoItem from "./components/TodoItem";

const API_URL = "http://localhost:5000/api/todos";

const titleContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const titleLetter = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
};

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("new");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
      alert(
        "Error: Cannot connect to the database. Make sure MongoDB is running locally!",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, priority }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add");
      setTodos([data, ...todos]);
      setNewTitle("");
      setPriority("Medium");
    } catch (err) {
      console.error("Error adding todo:", err);
      alert(`Could not save task. Is MongoDB running?`);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      setTodos(todos.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      console.error("Error toggling todo:", err);
      alert("Could not update task. Make sure MongoDB is running.");
    }
  };

  const handleEdit = async (id, newText) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to edit");
      setTodos(todos.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      console.error("Error editing todo:", err);
      alert("Could not edit task. Make sure MongoDB is running.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      const deletedTodo = await res.json();
      // Instead of removing from local state, update it with the returned 'deleted' flagged object
      setTodos(todos.map((t) => (t._id === id ? deletedTodo : t)));
    } catch (err) {
      console.error("Error deleting todo:", err);
      alert("Could not delete task. Make sure MongoDB is running.");
    }
  };

  const handleRestore = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // Un-delete and un-complete when restoring
        body: JSON.stringify({
          deleted: false,
          deletedAt: null,
          completed: false,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to restore");
      setTodos(todos.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      console.error("Error restoring todo:", err);
      alert("Could not restore task.");
    }
  };

  // Grouping todos
  const newTodos = todos.filter((t) => !t.completed && !t.deleted);
  const completedTodos = todos.filter((t) => t.completed && !t.deleted);
  const deletedTodos = todos.filter((t) => t.deleted);

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="app-header">
        <motion.h1
          variants={titleContainer}
          initial="hidden"
          animate="show"
          className="animated-title"
        >
          {Array.from("✨ Elevate Your Tasks ✨").map((char, index) => (
            <motion.span key={index} variants={titleLetter}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Organize seamlessly. Achieve more.
        </motion.p>
      </div>

      <motion.form
        className="add-todo-form"
        onSubmit={handleAddTodo}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <input
          type="text"
          placeholder="What's your next big move?"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <motion.button
          type="submit"
          className="btn-add"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 15px rgba(167, 139, 250, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          + Create
        </motion.button>
      </motion.form>

      {loading ? (
        <div className="loader">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="spinner"
          />
        </div>
      ) : (
        <div className="tabbed-board">
          {/* Tab Navigation */}
          <div className="tab-nav">
            <button
              className={`tab-btn ${activeTab === "new" ? "active" : ""}`}
              onClick={() => setActiveTab("new")}
            >
              🚀 New <span className="count">{newTodos.length}</span>
            </button>
            <button
              className={`tab-btn ${activeTab === "completed" ? "active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              ✅ Completed{" "}
              <span className="count">{completedTodos.length}</span>
            </button>
            <button
              className={`tab-btn ${activeTab === "deleted" ? "active" : ""}`}
              onClick={() => setActiveTab("deleted")}
            >
              🗑️ Deleted <span className="count">{deletedTodos.length}</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content-container">
            <AnimatePresence mode="wait">
              {activeTab === "new" && (
                <motion.div
                  key="new"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="kanban-list"
                >
                  <AnimatePresence mode="popLayout">
                    {newTodos.map((todo) => (
                      <TodoItem
                        key={todo._id}
                        todo={todo}
                        listType="new"
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                      />
                    ))}
                  </AnimatePresence>
                  {newTodos.length === 0 && (
                    <div className="empty-msg">No new tasks. Relax!</div>
                  )}
                </motion.div>
              )}

              {activeTab === "completed" && (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="kanban-list"
                >
                  <AnimatePresence mode="popLayout">
                    {completedTodos.map((todo) => (
                      <TodoItem
                        key={todo._id}
                        todo={todo}
                        listType="completed"
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                      />
                    ))}
                  </AnimatePresence>
                  {completedTodos.length === 0 && (
                    <div className="empty-msg">No completed tasks yet.</div>
                  )}
                </motion.div>
              )}

              {activeTab === "deleted" && (
                <motion.div
                  key="deleted"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="kanban-list"
                >
                  <AnimatePresence mode="popLayout">
                    {deletedTodos.map((todo) => (
                      <TodoItem
                        key={todo._id}
                        todo={todo}
                        listType="deleted"
                        onRestore={handleRestore}
                      />
                    ))}
                  </AnimatePresence>
                  {deletedTodos.length === 0 && (
                    <div className="empty-msg">Recycle bin is empty.</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      <motion.div
        className="signature-box"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="developed-text">Designed & Engineered by</span>
        <motion.h2
          className="creator-name"
          animate={{
            textShadow: [
              "0px 0px 8px #a78bfa",
              "0px 0px 20px #60a5fa",
              "0px 0px 8px #a78bfa",
            ],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Harshil Chavda
        </motion.h2>
      </motion.div>
    </motion.div>
  );
}

export default App;
