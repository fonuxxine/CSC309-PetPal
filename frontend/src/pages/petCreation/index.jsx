import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

let bearer = "Bearer " + localStorage.getItem("access_token");

function PetCreation() {
  let navigate = useNavigate();
  const { shelterID } = useParams();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
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

  const statusValues = ["available", "adopted", "pending", "withdrawn"];

  const genderValues = ["female", "male"];

  function create() {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("photo", photo);
      formData.append("breed", breed);
      formData.append("type", type);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("type", size);
      formData.append("age", description);
      formData.append("gender", status);
      formData.append("type", medicalHistory);
      formData.append("age", specialRequirements);
      formData.append("gender", behaviour);

    fetch(`shelter-listings/${shelterID}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.detail) {
          setError("Error: error with pet creation");
        }
      })
      .catch((err) => {
        setError('error:' + err);
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
        <h1 className="text-center fw-bold m-5">Create Pet Profile</h1>
      <div className="d-flex justify-content-center pb-5">
          <form className="w-50">
              <div className="form-group p-2">
                  <label class="form-label" for="customFile">Upload pet photo</label>
                  <input type="file"
                         class="form-control"
                         id="customFile"
                         onChange={(event => setPhoto(event.target.files[0]))}/>
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
                    {genderValues.map((gender, i) => (
                      <option value={gender} key={i}>
                        {gender}
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
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    required
                  >
                     <option value="">Select status</option>
                    {statusValues.map((status, i) => (
                      <option value={status} key={i}>
                        {status}
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
          </form>
      </div>
    </>
  );
}

export default PetCreation;
