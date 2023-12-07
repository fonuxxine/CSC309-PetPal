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
    const [errors, setErrors] = useState({});

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
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            if ("id" in json) {
                alert("Successfully signed up!");
                navigate('/login/');
            } else {
                setErrors(json)
            }
        });
    }

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
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                    </div>
                    {errors.username ? (<p className="login-error p-0">{errors.username}</p>) : (<></>)}
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
                    {errors.password ? (<p className="login-error p-0">{errors.password}</p>) : (<></>)}
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
                    {errors.repeat_password ? (<p className="login-error p-0">{errors.repeat_password}</p>) : (<></>)}
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
                    {errors.email ? (<p className="login-error p-0">{errors.email}</p>) : (<></>)}
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
                    {errors.name ? (<p className="login-error p-0">{errors.name}</p>) : (<></>)}
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
                    {errors.surname ? (<p className="login-error p-0">{errors.surname}</p>) : (<></>)}
                    <div><button className="login-but mt-2 p-2" onClick={() => signup()}>Sign up</button></div>
                    
                </div>
            </div>

        </div>
    )
}

export default SignUpPetSeeker;