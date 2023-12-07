import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { Route, Link, useParams } from "react-router-dom";



function AllShelters() {


    const [shelters, setShelters] = useState([]);
    const [shelterPage, setShelterPage] = useState(1);
    const [shelterNext, setShelterNext] = useState(true);
    const [shelterPrev, setShelterPrev] = useState(false);

    const shelterURL = `/accounts/shelter/?page=${shelterPage}`;

    useEffect(() => {
        async function fetchShelters() {
            await fetch(shelterURL, {
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
            {shelterNext ? (
          shelterPrev ? (
            <div className="d-flex justify-content-between my-2">
              <button
                className="btn btn-primary btn-outline-dark btn-review"
                onClick={() => setShelterPage(shelterPage - 1)}
              >
                Prev
              </button>
              <button
                className="btn btn-primary btn-outline-dark btn-review"
                onClick={() => setShelterPage(shelterPage + 1)}
              >
                Next
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-end my-2">
              <button
                className="btn btn-primary btn-outline-dark btn-review"
                onClick={() => setShelterPage(shelterPage + 1)}
              >
                Next
              </button>
            </div>
          )
        ) : shelterPrev ? (
          <div className="d-flex justify-content-start my-2">
            <button
              className="btn btn-primary btn-outline-dark btn-review"
              onClick={() => setShelterPage(shelterPage - 1)}
            >
              Prev
            </button>
          </div>
        ) : (
          <></>
        )}
        </div>
    )
}

export default AllShelters;