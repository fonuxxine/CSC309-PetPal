import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

let bearer = "Bearer " + localStorage.getItem("access_token");

function ShelterUpdate() {
  const navigate = useNavigate();
  const [shelterInfo, setShelterInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const { accountID } = useParams();

  useEffect(() => {
    fetch(`/accounts/shelter/${accountID}/`, {
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
        setShelterInfo(json);
        setProfilePicPreview(json.profile_pic);
      });
  }, [accountID, navigate]);

  function handleCancel() {
    fetch(`/accounts/shelter/${accountID}/`, {
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
        setShelterInfo(json);
        setProfilePicPreview(json.profilePic);
      });
    setErrors({});
  }

  async function handleSave() {
    const formData = new FormData();
    for (let key in shelterInfo) {
      if (shelterInfo[key] !== null) {
        formData.append(key, shelterInfo[key]);
      }
    }

    fetch(`/accounts/shelter/${accountID}/`, {
      method: "PATCH",
      headers: {
        Authorization: bearer,
      },
      body: formData,
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

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(selectedFile?.type)) {
      setErrors((errors) => ({
        ...errors,
        profile_pic: "Must be JPG, JPEG or PNG",
      }));
    } else {
      setShelterInfo({ ...shelterInfo, profile_pic: selectedFile });
      setErrors((errors) => ({ ...errors, profile_pic: "" }));
      const file = new FileReader();
      file.onload = function () {
        setProfilePicPreview(file.result);
      };
      file.readAsDataURL(selectedFile);
    }
  }

  async function handleDelete() {
    fetch(`/accounts/shelter/${accountID}/`, {
      method: "DELETE",
      headers: {
        Authorization: bearer,
      },
    }).then((resp) => {
      if (resp.status === 204) {
        localStorage.clear();
        alert("Your account has been deleted!");
        window.location.reload();
        navigate("/login/");
      } else {
        navigate("/login/");
      }
    });
  }

  function logOut() {   
    localStorage.clear();
    alert("You've been logged out!");
    window.location.reload();
    navigate("/login/");
  }

  return (
    <div className="row container-fluid update-account ps-5">
      <div className="col-md-5 col-lg-4 ps-4 pe-5 pb-0 pt-5 profile h-50">
        <div className="position-relative row-sm-5 mb-5">
          <img
            className="img-thumbnail account-profile-pic"
            src={
              profilePicPreview ??
              "https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
            }
            alt="Profile"
          />
          <p className="error">{errors?.profile_pic ?? ""}</p>
          <label
            htmlFor="profile"
            className="btn btn-primary position-absolute bottom-0 start-0"
          >
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
        <Link
          to="/shelter/manage/"
          className="btn btn-primary btn-outline-dark my-md-5 mb-0"
        >
          Edit Pet Listings
        </Link>
        <button
          type="button"
          className="btn btn-primary btn-outline-dark mt-5 "
          onClick={logOut}
        >
          Log Out
        </button>
        <button
          type="button"
          className="btn btn-dark delete-account mt-5"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>
      <div className="col-md-7 col-lg-6 p-5 pb-0">
        <h1 className="text-center">Update Shelter Information</h1>
        <div className="mb-3">
          <label htmlFor="account-username" className="form-label">
            Username
          </label>
          <input
            className="form-control"
            type="text"
            name="account-username"
            id="account-username"
            value={shelterInfo?.username ?? ""}
            onChange={(event) =>
              setShelterInfo({ ...shelterInfo, username: event.target.value })
            }
          />
          {errors?.username !== null && errors.username !== "" ? (
            <p className="error">{errors.username}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="shelter-name" className="form-label">
            Shelter Name
          </label>
          <input
            className="form-control"
            type="text"
            name="shelter-name"
            id="shelter-name"
            value={shelterInfo?.shelter_name ?? ""}
            onChange={(event) =>
              setShelterInfo({
                ...shelterInfo,
                shelter_name: event.target.value,
              })
            }
          />
          {errors?.shelter_name !== null && errors.shelter_name !== "" ? (
            <p className="error">{errors.shelter_name}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="shelter-email" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            name="shelter-email"
            id="shelter-email"
            value={shelterInfo?.email ?? ""}
            onChange={(event) =>
              setShelterInfo({ ...shelterInfo, email: event.target.value })
            }
          />
          {errors?.email !== null && errors.email !== "" ? (
            <p className="error">{errors.email}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="shelter-address" className="form-label">
            Address
          </label>
          <input
            className="form-control"
            type="text"
            name="shelter-address"
            id="shelter-address"
            value={shelterInfo?.location ?? ""}
            onChange={(event) =>
              setShelterInfo({ ...shelterInfo, location: event.target.value })
            }
          />
          {errors?.location !== null && errors.location !== "" ? (
            <p className="error">{errors.location}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="shelter-mission" className="form-label">
            Mission Statement
          </label>
          <textarea
            rows="5"
            className="form-control"
            type="text"
            name="shelter-mission"
            id="shelter-mission"
            value={shelterInfo?.mission_statement ?? ""}
            onChange={(event) =>
              setShelterInfo({
                ...shelterInfo,
                mission_statement: event.target.value,
              })
            }
          />
          {errors?.mission_statement !== null &&
          errors.mission_statement !== "" ? (
            <p className="error">{errors.mission_statement}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="shelter-password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="shelter-password"
            id="shelter-password"
            onChange={(event) =>
              setShelterInfo({ ...shelterInfo, password: event.target.value })
            }
          />
          {errors?.password !== null && errors.password !== "" ? (
            <p className="error">{errors.password}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="update-btns d-grid gap-2 d-md-flex justify-content-md-evenly pb-4">
          <button
            className="btn btn-primary btn-outline-dark"
            type="button"
            onClick={handleSave}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-dark cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShelterUpdate;
