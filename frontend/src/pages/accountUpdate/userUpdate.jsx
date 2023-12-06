import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

let bearer = "Bearer " + localStorage.getItem("access_token");

function UserUpdate() {
  const navigate = useNavigate();
  const [prevUserInfo, setPrevUserInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [errors, setErrors] = useState({});
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
        setPrevUserInfo(json);
        setUserInfo(json);
      });
  }, [accountID, navigate]);

  function handleCancel() {
    setUserInfo(prevUserInfo);
  }

  async function handleSave() {
    fetch(`/accounts/pet-user/${accountID}/`, {
      method: "PATCH",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
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
        navigate("/");
      } else {
        navigate("/login/");
      }
    });
  }

  return (
    <div className="row container-fluid update-account">
      <div className="col-md-5 col-lg-4 ps-4 pe-5 pb-0 pt-5 profile h-50">
        <div className="position-relative row-sm-5">
          <img
            className="img-thumbnail profile-pic"
            src={
              userInfo?.profile_pic ??
              "https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
            }
            alt="Profile"
          />
          <label
            htmlFor="profile"
            className="btn btn-primary position-absolute bottom-0 start-0"
          >
            <input type="file" id="profile" className="d-none" />
            Edit
          </label>
        </div>
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
        <div class="mb-3">
          <label htmlFor="account-username" class="form-label">
            Username
          </label>
          <input
            class="form-control"
            type="text"
            name="account-username"
            id="account-username"
            value={userInfo.username}
            onChange={(event) =>
              setUserInfo({ ...userInfo, username: event.target.value })
            }
          />
          <p className="error">{errors?.username ?? ""}</p>
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
          <p className="error">{errors?.name ?? ""}</p>
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
          <p className="error">{errors?.surname ?? ""}</p>
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
          <p className="error">{errors?.email ?? ""}</p>
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
          <p className="error">{errors?.location ?? ""}</p>
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
          <p className="error">{errors?.password ?? ""}</p>
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
