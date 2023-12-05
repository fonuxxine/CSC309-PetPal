import React from "react";
import { useState } from "react";
import "./style.css";

function PetDetail() {
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
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg"
                            />
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <h1 className="text-left fw-bold">Pet 1 Name</h1>

                        <h6 className="text-left fw-bold pt-2 pb-2">Playful orange cat</h6>

                        {/* Put this into its own component */}
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Breed</td>
                                    <td>Domestic Shorthair</td>
                                </tr>
                                <tr>
                                    <td>Age</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>Available</td>
                                </tr>
                                <tr>
                                    <td>Publication Date</td>
                                    <td>09/05/2023</td>
                                </tr>
                                <tr>
                                    <td>Shelter Name</td>
                                    <td>
                                        <a href="shelter_detail.html" class="adoption-link">Cat Adoption Center</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>Male</td>
                                </tr>
                                <tr>
                                    <td>Size</td>
                                    <td>Large</td>
                                </tr>
                                <tr>
                                    <td>Medical History</td>
                                    <td>Tuna allergy, allergic to the sun, went to hospital for surgery yesterday</td>
                                </tr>
                                <tr>
                                    <td>Special Requirements</td>
                                    <td>Hates dogs</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="container">
                            <p className="text-left">
                            Very important cat description here. Occaecat et. Eos occaecat. Aspernatur sunt or labore laudantium.
                            Quaerat tempor illo so commodo. Corporis velit but aliquid tempora quae quisquam for laboris.
                            Exercitationem. Quo perspiciatis yet laboris eos si. Numquam occaecat ad or amet vel yet id. Lorem in, but
                            eum. Irure iste yet nostrud, accusantium.
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