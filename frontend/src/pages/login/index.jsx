import React from "react";
import { useState } from "react";
import "./style.css";

const tokenURL = "/api/token/";
const userURL = "/accounts/all/";
const shelterURL = "/accounts/shelter/";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function login() {
    fetch(tokenURL, {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
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
          localStorage.setItem("username", username);
          localStorage.setItem("access_token", json.access);
          localStorage.setItem("refresh_token", json.refresh);
          findID();
        }
      })
      .catch((err) => {
        setError("Error: invalid username and password combination");
      });
  }

  async function findID() {
    await fetch(userURL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        for (let i = 1; i <= Math.ceil(json.count / 10); i++) {
          fetch(userURL + "?page=" + i, {
            method: "GET",
          })
            .then((response) => response.json())
            .then((json) => {
              for (let i = 0; i < json.results.length; i++) {
                if (json.results[i].username === username) {
                  localStorage.setItem("user_id", json.results[i].id);
                  localStorage.setItem("is_shelter", false);
                  const id = json.results[i].id;
                  fetch(shelterURL, { method: "GET" })
                    .then((response) => response.json())
                    .then((json) => {
                      for (let i = 1; i <= Math.ceil(json.count / 9); i++) {

                        fetch(shelterURL + "?page=" + i, {
                          method: "GET",
                        })
                          .then((response) => response.json())
                          .then((json) => {
                            for (let i = 0; i < json.results.length; i++) {
                              if (json.results[i].id === id) {
                                localStorage.setItem("is_shelter", true);
                                window.location.href = "/";
                              }
                            }
                            window.location.href = "/";
                          });
                      }
                    });
                }
              }
            });
        }
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
