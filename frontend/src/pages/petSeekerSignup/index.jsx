import React from "react";
import { useState } from "react";
import "./style.css";

function SignUpPetSeeker() {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [repeatPassword, setRepeatPassword] = useState("");
    // const [email, setEmail] = useState("");
    // const [shelterName, setShelterName] = useState("");

    return (
        <div className="container-fluid">
            <h1 className="signup-h1 text-center p-4">Create a PetPal Pet Seeker Account</h1>
            <div className="d-flex justify-content-center">
                <div className="w-75">
                    <div className="form-group p-2">
                        <label>Username</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Password</label>
                        <input 
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Repeat password</label>
                        <input 
                            type="password"
                            className="form-control"
                            placeholder="Repeat your password"
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Email</label>
                        <input 
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>First Name</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Last Name</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div><button className="login-but mt-2 p-2">Sign up</button></div>
                    
                </div>
            </div>

        </div>
    )
}

export default SignUpPetSeeker;