import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { useParams, useNavigate } from "react-router-dom";

var bearer = 'Bearer ' + localStorage.getItem('access_token');

function PetSeekerDetail() {

    const [ username, setUsername ] = useState("");
    const [ name, setName ] = useState("");
    const [ surname, setSurname ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ location, setLocation ] = useState("");

    const { userID } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            await fetch(`/accounts/pet-user/${userID}/profile/`, {
                method: "GET",
                headers : {
                    'Authorization': bearer
                }
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error;
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                setUsername(JSON.parse(JSON.stringify(json))["username"]);
                setName(JSON.parse(JSON.stringify(json))["name"]);
                setSurname(JSON.parse(JSON.stringify(json))["surname"]);
                setEmail(JSON.parse(JSON.stringify(json))["email"]);
                setLocation(JSON.parse(JSON.stringify(json))["location"]);
            })
            .catch((err) => {
                navigate('/*');
            })
        }
        fetchUser();
    }, [])

    function navBack() {
        return navigate(-1);
    }

    return (
        <>
            <div className="container-fluid return-to-bar">
                <div className="row">
                    <div className="col-sm-4 justify-content-start p-3">
                        <button className="btn btn-outline-dark search-btn" onClick={() => navBack()}>Return to application</button>
                    </div>
                    <div className="col-sm-4 justify-content-center p-3">
                        <h1 className="login-h1 text-center fw-bold">{name} Profile</h1>
                    </div>
                
                </div> 
            </div>
            <div className="d-flex justify-content-center pt-4">
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
        </>
    )
}

export default PetSeekerDetail;