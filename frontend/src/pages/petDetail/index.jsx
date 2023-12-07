import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { Link, useParams, useNavigate } from "react-router-dom";



function PetDetail() {

    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [size, setSize] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [publication_date, setPublicationDate] = useState("");
    const [medical_history, setMedicalHistory] = useState("");
    const [special_requirements, setSpecialRequirements] = useState("");
    const [behaviour, setBehaviour] = useState("");

    let navigate = useNavigate();


    const { petID } = useParams();

    const petURL = "/pet-listings/" + petID + "/";

    useEffect(() => {
        async function fetchPet() {
            await fetch(petURL, {
                method: "GET"
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error;
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                setName(JSON.parse(JSON.stringify(json))["name"]);
                setPhoto(JSON.parse(JSON.stringify(json))["photo"]);
                setBreed(JSON.parse(JSON.stringify(json))["breed"]);
                setAge(JSON.parse(JSON.stringify(json))["age"]);
                setGender(JSON.parse(JSON.stringify(json))["gender"]);
                setSize(JSON.parse(JSON.stringify(json))["size"]);
                setDescription(JSON.parse(JSON.stringify(json))["description"]);
                setStatus(JSON.parse(JSON.stringify(json))["status"]);
                setPublicationDate(JSON.parse(JSON.stringify(json))["publication_date"]);
                setMedicalHistory(JSON.parse(JSON.stringify(json))["medical_history"]);
                setSpecialRequirements(JSON.parse(JSON.stringify(json))["special_requirements"]);
                setBehaviour(JSON.parse(JSON.stringify(json))["behaviour"]);
            })
            .catch((err) => {
                navigate('/*');
            })
        }
        fetchPet();
    }, []);


 
    return (
        <div>
            <div className="container-fluid return-to-bar d-flex justify-content-start p-3">
                {/* Actually make this work */}
                {/* <a href="index.html" class="btn btn-outline-dark search-btn">Return to search</a> */}
                <Link to="/" className="btn btn-outline-dark search-btn">Return to search</Link>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="p-3">
                            <img 
                                className="pet-detail-img rounded img-fluid mb-3" 
                                src={photo}
                                alt={name}
                            />
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <h1 className="text-left fw-bold">{name}</h1>

                        <h6 className="text-left fw-bold pt-2 pb-2">{behaviour}</h6>

                        {/* Put this into its own component */}
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Breed</td>
                                    <td>{breed}</td>
                                </tr>
                                <tr>
                                    <td>Age</td>
                                    <td>{age} </td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{status}</td>
                                </tr>
                                <tr>
                                    <td>Publication Date</td>
                                    <td>{publication_date.split("T")[0]}</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>{gender}</td>
                                </tr>
                                <tr>
                                    <td>Size</td>
                                    <td>{size}</td>
                                </tr>
                                <tr>
                                    <td>Medical History</td>
                                    <td>{medical_history}</td>
                                </tr>
                                <tr>
                                    <td>Special Requirements</td>
                                    <td>{special_requirements}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="container">
                            <p className="text-left">
                            {description}
                            </p>
                        </div>
                        <div className="container-fluid d-flex justify-content-start pt-4 pb-4">
                            {/* Replace to link later */}
                            <Link to={`/pet-listing/${petID}/adoption/`} className="btn btn-outline-dark adoption-btn m-4">Adoption Application</Link>
                             <Link to={`applications/`} className="btn btn-outline-dark adoption-btn m-4">View Application</Link>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        
    )
}

export default PetDetail;