import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

let bearer = "Bearer " + localStorage.getItem("access_token");

function UserUpdate() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const { accountID } = useParams();

  useEffect(() => {
    fetch(`/accounts/pet-user/${accountID}/`, {
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
        setUserInfo(json);
        setProfilePicPreview(json.profilePic);
      });
  }, [accountID, navigate]);

  function handleCancel() {
    setErrors({});
    fetch(`/accounts/pet-user/${accountID}/`, {
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
        setUserInfo(json);
        setProfilePicPreview(json.profilePic);
      });
  }

  async function handleSave() {
    const formData = new FormData();
    for (let key in userInfo) {
      if (userInfo[key] !== null) {
        formData.append(key, userInfo[key]);
      }
    }

    fetch(`/accounts/pet-user/${accountID}/`, {
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

  async function handleDelete() {
    fetch(`/accounts/pet-user/${accountID}/`, {
      method: "DELETE",
      headers: {
        Authorization: bearer,
      },
    }).then((resp) => {
      if (resp.status === 204) {
        localStorage.clear();
        window.location.reload();
        navigate("/");
      } else {
        navigate("/login/");
      }
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
      console.log("here");
      setUserInfo({ ...userInfo, profile_pic: selectedFile });
      setErrors((errors) => ({ ...errors, profile_pic: "" }));
      const file = new FileReader();
      file.onload = function () {
        setProfilePicPreview(file.result);
      };
      file.readAsDataURL(selectedFile);
    }
  }

  function logOut() {
    localStorage.clear();
    window.location.reload();
    navigate("/login/");
  }

  return (
    <div className="row container-fluid update-account">
      <div className="col-md-5 col-lg-4 ps-4 pe-5 pb-0 pt-5 profile h-50">
        <div className="position-relative row-sm-5">
          <img
            className="img-thumbnail profile-pic"
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
        <button
          type="button"
          className="btn btn-primary btn-outline-dark mt-5 d-none d-md-block"
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
        <h1 className="text-center">Update Account Information</h1>
        <div className="mb-3">
          <label htmlFor="account-username" className="form-label">
            Username
          </label>
          <input
            className="form-control"
            type="text"
            name="account-username"
            id="account-username"
            value={userInfo.username ?? ""}
            onChange={(event) =>
              setUserInfo({ ...userInfo, username: event.target.value })
            }
          />
          {errors?.username !== null && errors.username !== "" ? (
            <p className="error">{errors.username}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="account-name" className="form-label">
            First Name
          </label>
          <input
            className="form-control"
            type="text"
            name="account-name"
            id="account-name"
            value={userInfo?.name ?? ""}
            onChange={(event) =>
              setUserInfo({ ...userInfo, name: event.target.value })
            }
          />
          {errors?.name !== null && errors.name !== "" ? (
            <p className="error">{errors.name}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="account-last-name" className="form-label">
            Last Name
          </label>
          <input
            className="form-control"
            type="text"
            name="account-last-name"
            id="account-last-name"
            value={userInfo?.surname ?? ""}
            onChange={(event) =>
              setUserInfo({ ...userInfo, surname: event.target.value })
            }
          />
          {errors?.surname !== null && errors.surname !== "" ? (
            <p className="error">{errors.surname}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-3">
          <label htmlhtmlFor="user-email" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            name="user-email"
            id="user-email"
            value={userInfo?.email ?? ""}
            onChange={(event) =>
              setUserInfo({ ...userInfo, email: event.target.value })
            }
          />
          {errors?.email !== null && errors.email !== "" ? (
            <p className="error">{errors.email}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-3">
          <label htmlhtmlFor="user-address" className="form-label">
            Address
          </label>
          <input
            className="form-control"
            type="text"
            name="user-address"
            id="user-address"
            value={userInfo?.location ?? ""}
            onChange={(event) =>
              setUserInfo({ ...userInfo, location: event.target.value })
            }
          />
          {errors?.location !== null && errors.location !== "" ? (
            <p className="error">{errors.location}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-3">
          <label htmlhtmlFor="user-password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="user-password"
            id="user-password"
            onChange={(event) =>
              setUserInfo({ ...userInfo, password: event.target.value })
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

export default UserUpdate;
