import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos');
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const addTodo = async (text) => {
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  // Calculate counts
  const pendingCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - pendingCount;

  // Calculate completion percentage
  const completionPercentage = todos.length > 0 
    ? Math.round((completedCount / todos.length) * 100) 
    : 0;

  return (
    <div className="app">
      <h1>To-Do List</h1>

      {}
      <div className="progress-container">
        <div 
          className={`progress-bar ${
            completionPercentage < 30 ? 'low' : 
            completionPercentage < 70 ? 'medium' : 'high'
          }`}
          style={{ width: `${completionPercentage}%` }}
        ></div>
        <span className="progress-text">
          {completionPercentage}% Complete ({completedCount}/{todos.length})
        </span>
      </div>
      
      {}
      <div className="task-counter">
        <span className="pending">Pending: {pendingCount}</span>
        <span className="completed">Completed: {completedCount}</span>
      </div>
      
      <TodoForm addTodo={addTodo} />
      <TodoList 
        todos={todos} 
        updateTodo={updateTodo} 
        deleteTodo={deleteTodo} 
      />
    </div>

    
  );
}

export default App;