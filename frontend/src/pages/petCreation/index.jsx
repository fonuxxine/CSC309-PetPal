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
      {error !== "" ? <h4 className="text-center p-4 pb-0">{error}</h4> : <></>}
      <div className="d-flex justify-content-center">
          <div className="w-50">
            <h1 className="text-center fw-bold m-5">Create Pet Profile</h1>
              <div className="form-group p-2">
                  <label class="form-label" for="customFile">Upload pet photo</label>
                  <input type="file" class="form-control" id="customFile" />
              </div>
              <div className="form-group p-2">
                  <label>Name</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Enter name"
                      onChange={(event) => setName(event.target.value)}
                      required
                  />
              </div>
            <div className="form-group p-2">
                  <label>Breed</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Enter breed"
                      onChange={(event) => setBreed(event.target.value)}
                      required
                  />
              </div>
              <div className="form-group p-2">
                  <label>Type</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Enter type"
                      onChange={(event) => setType(event.target.value)}
                      required
                  />
              </div>
              <div className="form-group p-2">
                  <label>Age</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Enter age"
                      onChange={(event) => setAge(parseInt(event.target.value))}
                      required
                  />
              </div>
              <div className="form-group p-2">
                  <label>Gender</label>
                  <select
                    className="form-select"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                    required
                  >
                     <option value="">Select gender</option>
                    {Object.entries(genderValues).map(([i, gender]) => (
                      <option value={gender} key={i}>
                        {genderValues[gender]}
                      </option>
                    ))}
                  </select>
              </div>
              <div className="form-group p-2">
                  <label>Size</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Enter size"
                      onChange={(event) => setSize(event.target.value)}
                      required
                  />
              </div>
              <div className="form-group p-2">
                  <label>Description</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Enter description"
                      onChange={(event) => setDescription(event.target.value)}
                      required
                  />
              </div>
              <div className="form-group p-2">
                  <label>Status</label>
                  <select
                    className="form-select"
                    value={gender}
                    onChange={(event) => setStatus(event.target.value)}
                    required
                  >
                     <option value="">Select status</option>
                    {Object.entries(statusValues).map(([i, status]) => (
                      <option value={status} key={i}>
                        {statusValues[status]}
                      </option>
                    ))}
                  </select>
              </div>
              <div className="form-group p-2">
                  <label>Medical History</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Enter medical history"
                      onChange={(event) => setMedicalHistory(event.target.value)}
                  />
              </div>
              <div className="form-group p-2">
                  <label>Special Requirements</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Enter special requirements"
                      onChange={(event) => setSpecialRequirements(event.target.value)}
                  />
              </div>
              <div className="form-group p-2">
                  <label>Behaviour</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Enter behaviour"
                      onChange={(event) => setBehaviour(event.target.value)}
                  />
              </div>
              <div><button className="login-but mt-2 p-2" onClick={() => create()}>Save</button></div>
          </div>
      </div>
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
      </div>
    </>
  );
}

export default PetCreation;
