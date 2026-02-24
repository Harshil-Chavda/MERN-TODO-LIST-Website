import React, { useState } from "react";
import { motion } from "framer-motion";

function TodoItem({ todo, listType, onToggle, onDelete, onEdit, onRestore }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleSave = () => {
    if (editText.trim() === "") return;
    onEdit(todo._id, editText);
    setIsEditing(false);
  };

  // Determine the date to show based on the list
  const getDisplayDate = () => {
    if (listType === "deleted" && todo.deletedAt) {
      return `Deleted: ${new Date(todo.deletedAt).toLocaleDateString()}`;
    }
    if (listType === "completed" && todo.completedAt) {
      return `Completed: ${new Date(todo.completedAt).toLocaleDateString()}`;
    }
    return `Created: ${new Date(todo.createdAt).toLocaleDateString()}`;
  };

  // Badge class for priority
  const priorityClass = `priority-badge ${todo.priority.toLowerCase()}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: -50, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(30,30,50,0.8)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`todo-item ${listType}`}
    >
      {listType !== "deleted" && (
        <motion.div
          className={`checkbox ${todo.completed ? "checked" : ""}`}
          onClick={() => onToggle(todo._id, todo.completed)}
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
        />
      )}

      <div className="todo-content">
        {isEditing ? (
          <input
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
        ) : (
          <span className={`todo-text ${todo.completed ? "done" : ""}`}>
            {todo.title}
          </span>
        )}

        <div className="todo-meta">
          <span className={priorityClass}>{todo.priority}</span>
          <span className="date-text">{getDisplayDate()}</span>
        </div>
      </div>

      <div className="todo-actions">
        {listType === "deleted" ? (
          <motion.button
            className="btn-icon restore"
            onClick={() => onRestore(todo._id)}
            title="Restore"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            ♻️
          </motion.button>
        ) : (
          <>
            {isEditing ? (
              <motion.button
                className="btn-icon save"
                onClick={handleSave}
                title="Save"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                💾
              </motion.button>
            ) : (
              <motion.button
                className="btn-icon edit"
                onClick={() => setIsEditing(true)}
                title="Edit"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                ✏️
              </motion.button>
            )}
            <motion.button
              className="btn-icon delete"
              onClick={() => onDelete(todo._id)}
              title="Delete"
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
            >
              🗑️
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default TodoItem;
