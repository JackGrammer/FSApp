import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    updateTodo(todo._id, { text: editText });
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateTodo(todo._id, { completed: !todo.completed })}
      />
      
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>
              <FaEdit />
            </button>
            <button onClick={() => deleteTodo(todo._id)}>
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;