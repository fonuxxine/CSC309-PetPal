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
                            <img src="https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fw7kk3zea9lq61.jpg" alt=""/>
                        </div>
                        <div className="info">
                            <h3>{shelter.shelter_name}</h3>
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