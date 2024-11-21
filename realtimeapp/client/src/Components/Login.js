import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { signinsucessfull, signing } from "../redux/user/userslice";
function Login({ onloginsuccess }) {
  const { loading, error, currentplayer } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      dispatch(signing());

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("username", data.username);
        console.log(data);
        toast.success("Welcome " + currentplayer);
        dispatch(signinsucessfull(data.username));
        navigate("/");
      } else {
        toast.error(data.message) || toast.error("Login failed");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
      // alert("Something went wrong");
    }
  };

  return (
    <div className="h-full login-container">
      <h2>Login</h2>
      <div className="flex items-center justify-center h-full">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center gap-2 "
        >
          <input
            className="flex-1 p-2 bg-transparent bg-black rounded-lg outline-none "
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            className="flex-1 p-2 bg-transparent bg-black rounded-lg outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            type="submit"
            className="flex-grow-0 p-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-700 hover:from-blue-700 hover:to-emerald-700"
          >
            Login
            <span>
              <ClipLoader
                color="#ffffff"
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </span>
          </button>
        </form>

        <p>
          If you don't have an account?<a href="/register">Register</a>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
