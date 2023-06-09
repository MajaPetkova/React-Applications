import { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [input, setInput] = useState("");

  const handleChange=(e)=>{
    setInput(e.target.value)
}
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(input);
    setInput("");
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What is the task today?"
          name="text"
          className="form-input"
          value={input}
          onChange={handleChange}
        />
        <button className="btn" add>
          Add Todo
        </button>
      </form>
    </div>
  );
};
