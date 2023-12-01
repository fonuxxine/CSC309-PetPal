import React from "react";
import { useState, useEffect } from "react";
import "./style.css";

const tokenURL = "/api/token/";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function login() {
    fetch(tokenURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.detail) {
          setError("Error: invalid username and password combination");
        } else {
          localStorage.clear();
          localStorage.setItem("access_token", json.access);
          localStorage.setItem("refresh_token", json.refresh);
          window.location.href = '/'
        }
      })
      .catch((err) => {
        setError("Error: invalid username and password combination");
      });
  }
  return (
    <div className="container-fluid">
      <h1 className="login-h1 text-center p-4">Login to PetPal</h1>
      {error !== "" ? (
        <h1 className="login-error text-center p-0">{error}</h1>
      ) : (
        <></>
      )}
      <div className="d-flex justify-content-center">
        <div className="w-75">
          <div className="form-group p-2">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="form-group p-2">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button className="login-but p-2" onClick={() => login()}>
            Login
          </button>
        </div>
      </div>
      <p className="text-center p-2">
        Don't have an account?{" "}
        <a className="signup-link" href="signup.html">
          Sign up
        </a>
      </p>
    </div>
  );
}

export default Login;
