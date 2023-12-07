import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { Route, Link, useParams } from "react-router-dom";

const shelterURL = "/accounts/shelter/";

function AllShelters() {


    const [shelters, setShelters] = useState([]);

    useEffect(() => {
        async function fetchShelters() {
            await fetch(shelterURL, {
                method: "GET",
            })
            .then((response) => response.json())
            .then((json) => {
                setShelters(json.results);
            });
        }
        fetchShelters();
    }, [])

    return (
        <div>
            <div className="container-fluid return-to-bar">
                <h1 className="login-h1 text-center p-4 fw-bold">All Shelters on PetPal</h1>
            </div>
            {shelters.map((shelter) => (
                <div className="notification">
                    <div className="info-and-pic">
                        <div className="noti-picture mb-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg" alt=""/>
                        </div>
                        <div className="info">
                            {/* add link styling to black */}
                            <Link to={`/shelter/${shelter.id}`}><h3>{shelter.shelter_name}</h3></Link>
                            <p>{shelter.mission_statement}</p>
                        </div>
                    </div>
                    <div className="date">
                        <p>{shelter.email}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllShelters;