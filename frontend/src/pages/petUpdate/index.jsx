import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

let bearer = "Bearer " + localStorage.getItem("access_token");
let userID = localStorage.getItem("user_id");

function PetUpdate() {
  const navigate = useNavigate();
  const [prevPetInfo, setPrevPetInfo] = useState({});
  const [petInfo, setPetInfo] = useState({});
  const [errors, setErrors] = useState({});
  const { petID } = useParams();

  useEffect(() => {
    fetch(`/shelter-listings/${userID}/pet/${petID}/`, {
      method: "GET",
      headers: {
        Authorization: bearer,
      },
    })
      .then((resp) => {
        if (resp.status >= 400) {
          navigate("/login/");
        }
        return resp.json();
      })
      .then((json) => {
        setPrevPetInfo(json);
        setPetInfo(json);
      });
  }, [petID, navigate]);

  function handleCancel() {
    setPetInfo(prevPetInfo);
  }

  async function handleSave() {
    fetch(`/shelter-listings/${userID}/pet/${petID}/`, {
      method: "PATCH",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petInfo),
    })
      .then((resp) => {
        if (resp.status === 200) {
          return {};
        }
        return resp.json();
      })
      .then((errors) => {
        setErrors(errors);
      });
  }

  return (
    <>
      <div className="container-fluid return-to-bar d-flex justify-content-start p-3 return-to-app">
        <Link
          to="/shelter/manage/"
          className="btn btn-default btn-outline-dark detail-btn"
        >
          {" "}
          Return to Home
        </Link>
      </div>
      <div className="application-form">
        <div className="profile-picture">
          <img
            alt="Pet"
            scr={
              petInfo?.photo ??
              "https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
            }
            className="upload-picture"
          ></img>
          <div className="container-fluid d-flex justify-content-center p-4 message">
            <label htmlFor="profile" className="edit-button btn btn-primary">
              <input
                type="file"
                id="profile"
                className="d-none"
                onChange={(event) =>
                  setPetInfo({ ...petInfo, photo: event.target.value })
                }
              />
              Edit
            </label>
          </div>
        </div>
        <div>
          <div className="container-fluid">
            <h1 className="text-center fw-bold mb-5">Update Pet Profile</h1>
            <div className="row">
              <div className="col-md-6">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={petInfo?.name ?? ""}
                    onChange={(event) =>
                      setPetInfo({ ...petInfo, name: event.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="field">
                  <label htmlFor="sex">Sex</label>
                  <select
                    type="text"
                    id="sex"
                    name="sex"
                    value={petInfo?.gender ?? ""}
                    onChange={(event) =>
                      setPetInfo({ ...petInfo, gender: event.target.value })
                    }
                  >
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <p className="error">{errors?.name ?? ""}</p>
              </div>
              <div className="col-md-6">
                <p className="error">{errors?.gender ?? ""}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="field">
                  <label htmlFor="breed">Breed</label>
                  <input
                    type="text"
                    id="breed"
                    name="breed"
                    value={petInfo?.breed ?? ""}
                    onChange={(event) =>
                      setPetInfo({ ...petInfo, breed: event.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="field">
                  <label htmlFor="type">Type</label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={petInfo?.type ?? ""}
                    onChange={(event) =>
                      setPetInfo({ ...petInfo, type: event.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <p className="error">{errors?.breed ?? ""}</p>
              </div>
              <div className="col-md-6">
                <p className="error">{errors?.type ?? ""}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="field">
                  <label htmlFor="status">Status</label>
                  <select
                    type="text"
                    id="status"
                    name="status"
                    value={petInfo?.status ?? ""}
                    onChange={(event) =>
                      setPetInfo({ ...petInfo, status: event.target.value })
                    }
                  >
                    <option value="AV">Available</option>
                    <option value="AD">Adopted</option>
                    <option value="PN">Pending</option>
                    <option value="WD">Withdrawn</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="field" id="age">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={petInfo?.age ?? 0}
                    onChange={(event) =>
                      setPetInfo({ ...petInfo, age: event.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <p className="error">{errors?.status ?? ""}</p>
              </div>
              <div className="col-md-6">
                <p className="error">{errors?.age ?? ""}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="field">
                  <label htmlFor="size">Size</label>
                  <input
                    type="text"
                    id="size"
                    name="size"
                    value={petInfo?.size ?? ""}
                    onChange={(event) =>
                      setPetInfo({
                        ...petInfo,
                        size: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p className="error">{errors?.status ?? ""}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="field">
                  <label htmlFor="description">Description</label>
                  <textarea
                    rows={4}
                    type="text"
                    id="description"
                    name="description"
                    value={petInfo?.description ?? ""}
                    onChange={(event) =>
                      setPetInfo({
                        ...petInfo,
                        description: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p className="error">{errors?.description ?? ""}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="field">
                  <label htmlFor="special-requirements">
                    Special Requirements
                  </label>
                  <textarea
                    rows={4}
                    type="text"
                    id="special-requirements"
                    name="special-requirements"
                    value={petInfo?.special_requirements ?? ""}
                    onChange={(event) =>
                      setPetInfo({
                        ...petInfo,
                        special_requirements: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p className="error">{errors?.special_requirements ?? ""}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="field">
                  <label htmlFor="medical">Medical History</label>
                  <textarea
                    rows={4}
                    type="text"
                    id="medical"
                    name="medical"
                    value={petInfo?.medical_history ?? ""}
                    onChange={(event) =>
                      setPetInfo({
                        ...petInfo,
                        medical_history: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p className="error">{errors?.medical_history ?? ""}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="field">
                  <label htmlFor="behaviour">Behaviour</label>
                  <textarea
                    rows={4}
                    type="text"
                    id="behaviour"
                    name="behaviour"
                    value={petInfo?.behaviour ?? ""}
                    onChange={(event) =>
                      setPetInfo({ ...petInfo, behaviour: event.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p className="error">{errors?.behaviour ?? ""}</p>
              </div>
            </div>
            <div className="d-flex">
              <div className="container-fluid d-flex justify-content-center p-4 message">
                <button
                  type="submit"
                  className="btn submit btn-outline-dark"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
              <div className="container-fluid d-flex justify-content-center p-4 cancel">
                <button
                  type="submit"
                  className="btn btn-outline-dark submit"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetUpdate;
