import React from "react";
import "./style.css";


function SignUp() {

    return (
        <div className="container-fluid">
            <h1 className="signup-h1 text-center p-4">Create a PetPal Account</h1>
            <div className="d-flex justify-content-center">
                <a href="signup.html" className="btn btn-outline-dark search-btn">Create a Pet Seeker Account</a>
                <a href="signup.html" className="btn btn-outline-dark search-btn">Create a Shelter Account</a>
            </div>
        </div>
    )
}

export default SignUp;