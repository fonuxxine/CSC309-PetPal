import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";

var bearer = 'Bearer ' + localStorage.getItem('access_token');

function PetSeekerDetail() {

    const [ username, setUsername ] = useState("");
    const [ name, setName ] = useState("");
    const [ surname, setSurname ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ location, setLocation ] = useState("");

    const { userID } = useParams();

    const userURL = "/accounts/pet-user/" + userID + "/profile/"

    useEffect(() => {
        async function fetchUser() {
            await fetch(userURL, {
                method: "GET",
                headers : {
                    'Authorization': bearer
                }
            })
            .then((response) => response.json())
            .then((json) => {
                setUsername(JSON.parse(JSON.stringify(json))["username"]);
                setName(JSON.parse(JSON.stringify(json))["name"]);
                setSurname(JSON.parse(JSON.stringify(json))["surname"]);
                setEmail(JSON.parse(JSON.stringify(json))["email"]);
                setLocation(JSON.parse(JSON.stringify(json))["location"]);
            });
        }
        fetchUser();
    }, [])

    return (
        <div className="container-fluid">
            <div className="container-fluid return-to-bar">
                <h1 className="login-h1 text-center p-4 fw-bold">{name} Profile</h1>
            </div>
            <div className="d-flex justify-content-center">
                <div className="w-75">
                    <div className="form-group p-2">
                        <label>Username</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={username}
                            readOnly
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>First Name</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={name}
                            readOnly
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Last Name</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={surname}
                            readOnly
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Email</label>
                        <input 
                            type="email"
                            className="form-control"
                            value={email}
                            readOnly
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Location</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={location}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetSeekerDetail;