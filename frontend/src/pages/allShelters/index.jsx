import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";



function AllShelters() {


    const [shelters, setShelters] = useState([]);
    const [shelterPage, setShelterPage] = useState(1);
    const [shelterNext, setShelterNext] = useState(true);
    const [shelterPrev, setShelterPrev] = useState(false);

    useEffect(() => {
        async function fetchShelters() {
            await fetch(`/accounts/shelter/?page=${shelterPage}`, {
                method: "GET",
            })
            .then((response) => response.json())
            .then((json) => {
                setShelterNext(json.next !== null);
                setShelterPrev(json.previous !== null);
                setShelters(json.results);
            });
        }
        fetchShelters();
    }, [shelterPage]);

    return (
        <>
            <div className="container-fluid return-to-bar">
                <h1 className="login-h1 text-center p-4 fw-bold">All Shelters on PetPal</h1>
            </div>
            {shelters.map((shelter) => (
                <div className="notification">
                    <div className="info-and-pic">
                        <div className="noti-picture mb-2">
                            {}
                            <img src={shelter.profile_pic} alt=""/>
                        </div>
                        <div className="info">
                            <Link to={`/shelter/${shelter.id}`} className="shelter-name"><h3>{shelter.shelter_name}</h3></Link>
                            <p>{shelter.mission_statement}</p>
                        </div>
                    </div>
                    <div className="date">
                        <p>{shelter.email}</p>
                    </div>
                </div>
            ))}
            {shelterNext ? (
              shelterPrev ? (
                <div className="d-flex justify-content-between p-3 m-3">
                  <button
                    className="btn btn-outline-dark shelter-btn"
                    onClick={() => setShelterPage(shelterPage - 1)}
                  >
                    Prev
                  </button>
                  <button
                    className="btn btn-outline-dark shelter-btn"
                    onClick={() => setShelterPage(shelterPage + 1)}
                  >
                    Next
                  </button>
                </div>
              ) : (
                <div className="d-flex justify-content-end p-3 m-3">
                  <button
                    className="btn btn-outline-dark shelter-btn"
                    onClick={() => setShelterPage(shelterPage + 1)}
                  >
                    Next
                  </button>
                </div>
              )
            ) : shelterPrev ? (
              <div className="d-flex justify-content-start p-3 m-3">
                <button
                  className="btn btn-outline-dark shelter-btn"
                  onClick={() => setShelterPage(shelterPage - 1)}
                >
                  Prev
                </button>
              </div>
            ) : (
              <></>
            )}
        </>
    )
}

export default AllShelters;