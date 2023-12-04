import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

let bearer = "Bearer " + localStorage.getItem("access_token");

function PetCreation() {
  let navigate = useNavigate();
  const { shelterID } = useParams();
  const [name, setName] = useState("");
  const [photo] = useState("");
  const [breed, setBreed] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [behaviour, setBehaviour] = useState("");
  const [error, setError] = useState("");

  const statusValues = {
    AV: "available",
    AD: "adopted",
    PN: "pending",
    WD: "withdrawn",
  };

  const genderValues = {
    F: "female",
    M: "male",
  };

  function create() {
    fetch(`shelter-listings/${shelterID}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({
        name: name,
        photo: photo,
        breed: breed,
        type: type,
        age: age,
        gender: gender,
        size: size,
        description: description,
        status: status,
        medicalHistory: medicalHistory,
        specialRequirements: specialRequirements,
        behaviour: behaviour,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.detail) {
          setError("Error: invalid authentication");
        }
      })
      .catch(() => {
        setError("Error: invalid authentication");
      });
  }

  return (
    <>
      <div className="container-fluid return-to-bar d-flex justify-content-start p-3 return-to-app">
        <button
          className="btn btn-default btn-outline-dark detail-btn"
          onClick={() => navigate("/shelter/manage/")}
        >
          Return to Home
        </button>
      </div>
      {error !== "" ? <h1 className="text-center p-0">{error}</h1> : <></>}
      <div className="application-form">
        {photo !== "" ? (
          <div className="profile-picture">
            <div className="upload-picture">
              <img src={photo} alt="pet photo" />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="container-fluid">
          <h1 className="text-center fw-bold mb-5">Create Pet Profile</h1>
          <div className="row">
            <div className="col-md-6 p-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="col-md-6 p-2">
              <label htmlFor="breed">Breed</label>
              <input
                type="text"
                id="breed"
                name="breed"
                onChange={(event) => setBreed(event.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 p-2">
              <label htmlFor="breed">Type</label>
              <input
                type="text"
                id="type"
                name="type"
                onChange={(event) => setType(event.target.value)}
                required
              />
            </div>
            <div className="col-md-6 p-2">
              <label htmlFor="age">age</label>
              <input
                type="text"
                id="age"
                name="age"
                onChange={(event) => setAge(parseInt(event.target.value))}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 p-2">
              <label htmlFor="gender">Gender</label>
              <select
                className="form-select"
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                required
              >
                {Object.entries(genderValues).map(([i, gender]) => (
                  <option value={gender} key={i}>
                    {genderValues[gender]}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 p-2">
              <label htmlFor="size">Size</label>
              <input
                type="text"
                id="size"
                name="size"
                onChange={(event) => setSize(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 p-2">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>
            <div className="col-md-6 p-2">
              <label htmlFor="status">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                required
              >
                {Object.entries(statusValues).map(([i, status]) => (
                  <option value={status} key={i}>
                    {statusValues[status]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label htmlFor="medical_history">Medical History</label>
              <textarea
                rows="4"
                id="medical_history"
                name="medical_history"
                onChange={(event) => setMedicalHistory(event.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="special_requirements">Special Requirements</label>
              <input
                type="text"
                id="special_requirements"
                name="special_requirements"
                onChange={(event) => setSpecialRequirements(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="behaviour">Behaviour</label>
              <input
                type="text"
                id="behaviour"
                name="behaviour"
                onChange={(event) => setBehaviour(event.target.value)}
              />
            </div>
          </div>

          <div className="d-flex">
            <div className="container-fluid d-flex justify-content-center p-4 message">
              <button
                type="submit"
                className="btn submit btn-outline-dark"
                onClick={() => create()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetCreation;
