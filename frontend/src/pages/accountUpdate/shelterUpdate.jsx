import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

let bearer = "Bearer " + localStorage.getItem("access_token");

function ShelterUpdate() {
  const navigate = useNavigate();
  const [prevShelterInfo, setPrevShelterInfo] = useState({});
  const [shelterInfo, setShelterInfo] = useState({});
  const [errors, setErrors] = useState({});
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
        setPrevShelterInfo(json);
        setShelterInfo(json);
      });
  }, [accountID, navigate]);

  function handleCancel() {
    setShelterInfo(prevShelterInfo);
  }

  async function handleSave() {
    fetch(`/accounts/shelter/${accountID}/`, {
      method: "PATCH",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shelterInfo),
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
    fetch(`/accounts/shelter/${accountID}/`, {
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

  function logOut() {
    localStorage.clear();
    window.location.reload();
    navigate("/login/");
  }

  return (
    <form className="needs-validation">
      <div className="row container-fluid">
        <div className="col-md-5 col-lg-4 ps-4 pe-5 pb-0 pt-5 profile h-50">
          <div className="position-relative row-sm-5 mb-5">
            <img
              className="img-thumbnail profile-pic"
              src={
                shelterInfo?.profile_pic ??
                "https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
              }
              alt="Profile"
            />
            <label
              htmlFor="profile"
              className="btn btn-primary position-absolute bottom-0 start-0"
            >
              <input
                type="file"
                id="profile"
                className="d-none"
                onChange={(event) =>
                  setShelterInfo({
                    ...shelterInfo,
                    profile_pic: event.target.value,
                  })
                }
              />
              Edit
            </label>
          </div>
          <a
            href="/shelter/manage/"
            className="btn btn-primary btn-outline-dark my-md-5 mb-0"
          >
            Edit Pet Listings
          </a>
          <button
            type="button"
            className="btn btn-primary btn-outline-dark mt-5 d-none d-md-block"
            onClick={logOut}
          >
            Log Out
          </button>
          <button
            type="button"
            className="btn btn-dark delete-account mt-5 d-none d-md-block"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>
        <div className="col-md-7 col-lg-6 p-5 pb-0">
          <h1 className="text-center">Update Shelter Information</h1>
          <div class="mb-3">
            <label htmlFor="account-username" class="form-label">
              Username
            </label>
            <input
              class="form-control"
              type="text"
              name="account-username"
              id="account-username"
              value={shelterInfo?.username}
              onChange={(event) =>
                setShelterInfo({ ...shelterInfo, username: event.target.value })
              }
            />
            <p className="error">{errors?.username ?? ""}</p>
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
            <p className="error">{errors?.shelter_name ?? ""}</p>
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
            <p className="error">{errors?.email ?? ""}</p>
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
            <p className="error">{errors?.location ?? ""}</p>
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
            <p className="error">{errors?.mission_statement ?? ""}</p>
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
    </form>
  );
}

export default ShelterUpdate;
