import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const petUserURL = "/accounts/pet-user/";

function SignUpPetSeeker() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");

    // need to redirect to different page??
    let navigate = useNavigate();

    function signup() {
        fetch(petUserURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                repeat_password: repeatPassword,
                email: email,
                name: firstName,
                surname: lastName,
            }),
        })
        .then((response) => response.json())
        .then((json) => {
            if (json.detail) {
                setError("Error: There is an error with registering");
            }
            else {
                alert("Successfully signed up!");
                navigate('/login/');
            }
        })
        .catch((err) => {
            setError("Error: There was error");
        });
    }

    return (
        <div className="container-fluid">
            <h1 className="signup-h1 text-center p-4">Create a PetPal Pet Seeker Account</h1>
            {error !== "" ? (<h1 className="login-error text-center p-0">{error}</h1>) : (<></>)}
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
                    <div className="form-group p-2">
                        <label>Repeat password</label>
                        <input 
                            type="password"
                            className="form-control"
                            placeholder="Repeat your password"
                            onChange={(event) => setRepeatPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Email</label>
                        <input 
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>First Name</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Enter your first name"
                            onChange={(event) => setFirstName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Last Name</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Enter your last name"
                            onChange={(event) => setLastName(event.target.value)}
                            required
                        />
                    </div>
                    <div><button className="login-but mt-2 p-2" onClick={() => signup()}>Sign up</button></div>
                    
                </div>
            </div>

        </div>
    )
}

export default SignUpPetSeeker;