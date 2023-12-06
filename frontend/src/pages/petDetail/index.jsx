import React from "react";
import { useState } from "react";
import "./style.css";
import { Route, Link, useParams } from "react-router-dom";

function PetDetail(props) {

    const [name, setName] = useState("Kermit");
    const [photo, setPhoto] = useState("https://upload.wikimedia.org/wikipedia/en/thumb/6/62/Kermit_the_Frog.jpg/220px-Kermit_the_Frog.jpg");
    const [breed, setBreed] = useState("Frog");
    const [age, setAge] = useState("68");
    const [gender, setGender] = useState("Male");
    const [size, setSize] = useState("Small");
    const [description, setDescription] = useState("An enthusiastic green frog");
    const [status, setStatus] = useState("Available - AV");
    const [publication_date, setPublicationDate] = useState("05/09/1995");
    const [medical_history, setMedicalHistory] = useState("Has peanut allergy");
    const [special_requirements, setSpecialRequirements] = useState("Has peanut allergy");
    const [behaviour, setBehaviour] = useState("Energetic green frog.");


    const { petID } = useParams();


 
    return (
        <div>
            <div className="container-fluid return-to-bar d-flex justify-content-start p-3">
                {/* Change to a link later */}
                <a href="index.html" class="btn btn-outline-dark search-btn">Return to search</a>
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
                                    <td>{publication_date}</td>
                                </tr>
                                <tr>
                                    <td>Shelter Name</td>
                                    <td>
                                        <a href="shelter_detail.html" class="adoption-link">Cat Adoption Center</a>
                                    </td>
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
                            <a href="pet_adoption.html" class="btn btn-outline-dark adoption-btn">Adoption Application</a>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        
    )
}

export default PetDetail;