import React, { useReducer, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.text, completed: false },
        ],
      };
    case "toggle":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case "delete":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      throw new Error();
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, { todos: [] });
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: "add", text });
    setText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: "toggle", id: todo.id })}
            />
            {todo.text}
            <button onClick={() => dispatch({ type: "delete", id: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
