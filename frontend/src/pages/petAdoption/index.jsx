import React from "react";
import { useState } from "react";
import "./style.css";

function PetAdoption() {

    return (
        <div>
            <div className="container-fluid return-to-bar d-flex justify-content-start p-3">
                {/* change to link later */}
                <a href="pet_detail.html" class="btn btn-outline-dark search-btn">Return to details</a>
            </div>
            <div className="container-fluid p-4">
                <h1 className="text-center fw-bold">Pet Adoption Form for Pet1</h1>
            </div>
            <div className="d-flex justify-content-center">
                <form className="w-50">
                    <div className="form-group p-2">
                        <label>First Name</label>
                        <input 
                            type="text"
                            className="form-control form-bg"
                            placeholder="Enter your first name"
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Last Name</label>
                        <input 
                            type="text"
                            className="form-control form-bg"
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Email</label>
                        <input 
                            type="email"
                            className="form-control form-bg"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Address</label>
                        <input 
                            type="text"
                            className="form-control form-bg"
                            placeholder="Enter your address"
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Why do you want to adopt this pet?</label>
                        <input 
                            type="text"
                            className="form-control form-bg"
                            placeholder="Enter your reason"
                        />
                    </div>

                    <div className="container-fluid d-flex justify-content-center p-4">
                    <button className="btn btn-outline-dark submit">Submit</button>
                </div>
                </form>
                
            </div>
        </div>
    )

}

export default PetAdoption;