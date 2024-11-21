import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Login from "./Components/Login";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home";
import { register } from "./Components/register";
import { Section } from "./Components/Section";
const socket = io("http://localhost:5000");

function App() {
  const [isLogin, setisLogin] = useState(false);
  useEffect(() => {
    var username = localStorage.getItem("username");
    if (username) {
      setisLogin(true);
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? <Home></Home> : <Navigate to="/login" replace></Navigate>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Section>
              <Login></Login>
            </Section>
          }
        ></Route>

        <Route path="/register">
          <Section>
            <register></register>
          </Section>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
