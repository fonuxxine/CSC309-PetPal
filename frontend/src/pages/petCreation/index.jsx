import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

let bearer = "Bearer " + localStorage.getItem("access_token");

function PetCreation() {
  let navigate = useNavigate();
  const { shelterID } = useParams();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
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
  const statusData = {
      "available": "AV",
      "adopted": "AD",
      "pending": "PN",
      "withdrawn": "WD",
    };

  const genderValues = ["female", "male"];
  const genderData = {
      "female": "F",
      "male": "M",
    };

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(selectedFile?.type)) {
      setError("Must be JPG, JPEG or PNG");
    } else {
      setPhoto(selectedFile);
      const file = new FileReader();
      file.readAsDataURL(selectedFile);
    }
  }

  function create() {
      const formData = new FormData();
      formData.append("name", name);
      if (photo != null) {
          formData.append("photo", photo);
      }
      formData.append("breed", breed);
      formData.append("type", type);
      formData.append("age", age);
      formData.append("gender", genderData[gender]);
      formData.append("size", size);
      formData.append("description", description);
      formData.append("status", statusData[status]);
      formData.append("medical_history", medicalHistory);
      formData.append("special_requirements", specialRequirements);
      formData.append("behaviour", behaviour);


    fetch(`/shelter-listings/${shelterID}/`, {
      method: "POST",
      headers: {
        Authorization: bearer,
      },
      body: formData,
    })
      .then((response) => {
          return response.json();
      })
      .then((json) => {
        if (!json.detail) {
            alert("Successfully created pet profile!");
            navigate(-1);
        } else {
            setError("Error with creating pet profile")
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
                  <label className="form-label" htmlFor="profile">Upload pet photo</label>
                  <input type="file"
                         className="form-control"
                         id="profile"
                         onChange={handleFileChange}
                         onClick={(event) => {
                            event.target.value = null;
                         }}
                  />
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
                      onChange={(event) => setBreed(event.target.value.toLowerCase())}
                  />
              </div>
              <div className="form-group p-2">
                  <label>Type</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Enter type"
                      onChange={(event) => setType(event.target.value.toLowerCase())}
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
                      value={size}
                      placeholder="Enter size"
                      onChange={(event) => setSize(event.target.value.toLowerCase())}
                      required
                  />
              </div>
              <div className="form-group p-2">
                  <label>Description</label>
                  <input
                      type="text"
                      className="form-control"
                      value={description}
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
