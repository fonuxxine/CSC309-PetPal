import React from "react";
import "./style.css";
import { Link } from "react-router-dom";


function SignUp() {

    return (
        <div className="container-fluid">
            <h1 className="signup-h1 text-center p-4">Create a PetPal Account</h1>
            <div className="d-flex justify-content-center">
                <Link className="btn btn-outline-dark search-btn" to="/signup/pet-user/">
                    Create a Pet Seeker Account
                </Link>
                {/* Replace this link later */}
                <Link className="btn btn-outline-dark search-btn" to="/signup/shelter/">
                    Create a Shelter Account
                </Link>
            </div>
        </div>
    )
}

export default SignUp;