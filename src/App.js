import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get(
      "https://ec2-51-20-18-163.eu-north-1.compute.amazonaws.com/api/todos"
    );
    setTodos(response.data);
  };

  const addTodo = async () => {
    const response = await axios.post(
      "https://ec2-51-20-18-163.eu-north-1.compute.amazonaws.com/api/todos",
      {
        task: newTodo,
        completed: false,
      }
    );
    setTodos([...todos, response.data]);
    setNewTodo("");
  };

  const updateTodo = async (id, completed) => {
    const response = await axios.put(
      `https://ec2-51-20-18-163.eu-north-1.compute.amazonaws.com/api/todos/${id}`,
      {
        completed: !completed,
      }
    );
    setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(
      `https://ec2-51-20-18-163.eu-north-1.compute.amazonaws.com/api/todos/${id}`
    );
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo._id, todo.completed)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
