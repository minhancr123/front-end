import { useState } from "react";
import { useSelector } from "react-redux";
import { Form, parsePath } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const register = () => {
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const handleSubmit = async () => {
    const response = await fetch("https://localhost:5000/register", {
      method: "POST",
      headers: { "Content/type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
        ></input>
        <input
          type="password"
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
        ></input>
        <button type="submit">Register</button>
      </form>
      <ToastContainer />
    </div>
  );
};
