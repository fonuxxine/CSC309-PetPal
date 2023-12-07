import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./style.css";

var bearer = 'Bearer ' + localStorage.getItem('access_token');

function PetAdoption() {

    const [petName, setPetName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    const { petID } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        async function fetchPet() {
            await fetch(`/pet-listings/${petID}/`, {
                method: "GET"
            })
            .then((response) => response.json())
            .then((json) => {
                setPetName(JSON.parse(JSON.stringify(json))["name"]);
            });
        }
        fetchPet();
    }, [petID]);

    function submitAdoption() {
        fetch(`/pet-listing/${petID}/applications/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': bearer
            },
            body: JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                email: email,
                address: address,
                reason: reason,
            }),
        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            if (json.detail) {
                setError("Error: error with adoption application");
            }
            else {
                alert("Your application has been successfully submitted!");
                navigate(-2);
            }
        })
        .catch((err) => {
            setError('error:' + err);
        });
    }

    return (
        <div>
            <div className="container-fluid return-to-bar d-flex justify-content-start p-3">
                <Link to={`/pet-listing/${petID}/`} className="btn btn-outline-dark search-btn">Return to details</Link>
            </div>
            <div className="container-fluid p-4">
                <h1 className="text-center fw-bold">Pet Adoption Form for {petName}</h1>
                {error !== "" ? (<h1 className="login-error text-center p-0">{error}</h1>) : (<></>)}
            </div>
            <div className="d-flex justify-content-center">
                <form className="w-50">
                    <div className="form-group p-2">
                        <label>First Name</label>
                        <input 
                            type="text"
                            className="form-control form-bg"
                            placeholder="Enter your first name"
                            onChange={(event) => setFirstName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Last Name</label>
                        <input 
                            type="text"
                            className="form-control form-bg"
                            placeholder="Enter your last name"
                            onChange={(event) => setLastName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Email</label>
                        <input 
                            type="email"
                            className="form-control form-bg"
                            placeholder="Enter your email"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Address</label>
                        <input 
                            type="text"
                            className="form-control form-bg"
                            placeholder="Enter your address"
                            onChange={(event) => setAddress(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Why do you want to adopt this pet?</label>
                        <input 
                            type="text"
                            className="form-control form-bg"
                            placeholder="Enter your reason"
                            onChange={(event) => setReason(event.target.value)}
                            required
                        />
                    </div>

                    <div className="container-fluid d-flex justify-content-center p-4">
                    <button className="btn btn-outline-dark submit" onClick={() => submitAdoption()}>Submit</button>
                </div>
                </form>
                
            </div>
        </div>
    )

}

export default PetAdoption;