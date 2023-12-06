import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const shelterURL = "/accounts/shelter/";

function SignUpShelter() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");
    const [shelterName, setShelterName] = useState("");
    const [missionStatement, setMissionStatement] = useState("");
    const [error, setError] = useState("");

    let navigate = useNavigate();

    // need to redirect to a different page?

    function signup() {
        fetch(shelterURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                repeat_password: repeatPassword,
                email: email,
                shelter_name: shelterName,
                mission_statement: missionStatement,
            }),
        })
        .then((response) => response.json())
        .then((json) => {
            if (json.detail) {
                setError("Error: error signing up");
            }
            else {
                alert("Successfully signed up!");
                navigate('/login/');
            }
        })
        .catch((err) => {
            setError("Error: error here");
        });
    }

    return (
        <div className="container-fluid">
            <h1 className="signup-h1 text-center p-4">Create a PetPal Shelter Account</h1>
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
                        <label>Shelter Name</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Enter your shelter name"
                            onChange={(event) => setShelterName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Mission Statement</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Enter your mission statement"
                            onChange={(event) => setMissionStatement(event.target.value)}
                            required
                        />
                    </div>
                    <div><button className="login-but mt-2 p-2" onClick={() => signup()}>Sign up</button></div>
                </div>
            </div>
        </div>
    )
}

export default SignUpShelter;