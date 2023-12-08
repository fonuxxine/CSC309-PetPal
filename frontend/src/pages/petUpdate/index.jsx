import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

let bearer = "Bearer " + localStorage.getItem("access_token");
let userID = localStorage.getItem("user_id");

function PetUpdate() {
  const navigate = useNavigate();
  const [petInfo, setPetInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoError, setPhotoError] = useState(false);
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
        setPetInfo(json);
        setPhotoPreview(json.photo);
        setPetInfo((petInfo) => ({
          ...petInfo,
          photo: null,
        }));
      });
  }, [petID, navigate]);

  function handleCancel() {
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
        setPetInfo(json);
        setPhotoPreview(json.photo);
        setPetInfo((petInfo) => ({
          ...petInfo,
          photo: null,
        }));
        setPhotoError(false);
      });
    setErrors({});
  }

  async function handleSave() {
    const formData = new FormData();
    for (let key in petInfo) {
      if (petInfo[key] !== null) {
        formData.append(key, petInfo[key]);
      }
    }

    fetch(`/shelter-listings/${userID}/pet/${petID}/`, {
      method: "PATCH",
      headers: {
        Authorization: bearer,
      },
      body: formData,
    })
      .then((resp) => {
        if (resp.status === 200) {
          setPhotoError(false);
          return {};
        }
        return resp.json();
      })
      .then((errors) => {
        setErrors(errors);
      });
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(selectedFile?.type)) {
      setErrors((errors) => ({ ...errors, photo: "Must be JPG, JPEG or PNG" }));
    } else {
      setPetInfo({ ...petInfo, photo: selectedFile });
      setErrors((errors) => ({ ...errors, photo: "" }));
      setPhotoError(false);
      const file = new FileReader();
      file.onload = function () {
        setPhotoPreview(file.result);
      };
      file.readAsDataURL(selectedFile);
    }
  }

  return (
    <>
      <div className="container-fluid return-to-bar d-flex justify-content-start p-3 return-to-app">
        <Link to="/shelter/manage/" className="btn btn-outline-dark search-btn">
          {" "}
          Return to pet management
        </Link>
      </div>
      <div className="application-form">
        <div className="profile-picture">
          <div className="upload-picture-container">
            {photoError ? (
              <img
                alt="Pet"
                src="https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                className="upload-picture"
              />
            ) : (
              <img
                alt="Pet"
                src={
                  photoPreview ??
                  "https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                }
                onError={() => {
                  setPhotoError(true);
                }}
                className="upload-picture"
              />
            )}
          </div>
          <p className="error">{errors?.photo ?? ""}</p>
          <div className="container-fluid d-flex justify-content-center ph-4 message">
            <label htmlFor="profile" className="edit-button btn btn-primary">
              <input
                type="file"
                id="profile"
                className="d-none"
                onChange={handleFileChange}
                onClick={(event) => {
                  event.target.value = null;
                }}
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
            <div
              className={
                (errors?.name !== null && errors.name !== "") ||
                (errors?.gender !== null && errors.gender !== "")
                  ? "row"
                  : "row d-none"
              }
            >
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
            <div
              className={
                (errors?.breed !== null && errors.breed !== "") ||
                (errors?.type !== null && errors.type !== "")
                  ? "row"
                  : "row d-none"
              }
            >
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
            <div
              className={
                (errors?.status !== null && errors.status !== "") ||
                (errors?.age !== null && errors.age !== "")
                  ? "row"
                  : "row d-none"
              }
            >
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
            <div
              className={
                errors?.size !== null && errors.size !== ""
                  ? "row"
                  : "row d-none"
              }
            >
              <div className="col-md-12">
                <p className="error">{errors?.size ?? ""}</p>
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
            <div
              className={
                errors?.description !== null && errors.description !== ""
                  ? "row"
                  : "row d-none"
              }
            >
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
            <div
              className={
                errors?.special_requirements !== null &&
                errors.special_requirements !== ""
                  ? "row"
                  : "row d-none"
              }
            >
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
            <div
              className={
                errors?.medical_history !== null &&
                errors.medical_history !== ""
                  ? "row"
                  : "row d-none"
              }
            >
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
            <div
              className={
                errors?.behaviour !== null && errors.behaviour !== ""
                  ? "row"
                  : "row d-none"
              }
            >
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
