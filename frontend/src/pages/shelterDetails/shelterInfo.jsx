import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function ShelterInfo() {
  const navigate = useNavigate();
  const [shelterInfo, setShelterInfo] = useState({});
  const [photoError, setPhotoError] = useState(false);
  const { shelterID } = useParams();

  useEffect(() => {
    fetch(`/accounts/shelter/${shelterID}/profile`, {
      method: "GET",
    })
      .then((resp) => {
        if (resp.status >= 400) {
          navigate("/");
        }
        return resp.json();
      })
      .then((json) => {
        setShelterInfo(json);
      });
  }, [shelterID, navigate]);

  return (
    <>
      <div className="container-fluid shelter-name-banner">
        <div className="row h-100">
          <div className="justify-content-sm-center justify-content-md-end d-none d-sm-flex col-sm-4 col-md-3 col-lg-2 shelter-logo-container">
            {photoError ? (
              <img
                className="img-thumbnail img-fluid shelter-logo"
                src="https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                alt="Profile"
              />
            ) : (
              <img
                className="img-thumbnail img-fluid shelter-logo"
                src={
                  shelterInfo?.profile_pic ??
                  "https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                }
                onError={() => {
                  setPhotoError(true);
                }}
                alt="Profile"
              />
            )}
          </div>
          <h1 className="col-12 col-sm-8 col-md-9 col-lg-10 justify-content-center mb-0 d-flex align-items-center shelter-name-text">
            {shelterInfo?.shelter_name ?? ""}
          </h1>
        </div>
      </div>
      <div className="row container-fluid text-center p-5">
        <div className="col-sm-4">
          <h2>Mission Statement</h2>
          <p>{shelterInfo?.mission_statement ?? ""}</p>
        </div>
        <div className="col-sm-4">
          {shelterInfo?.location === null || shelterInfo.location === "" ? (
            <></>
          ) : (
            <>
              <h2>Location</h2>
              <p>{shelterInfo.location}</p>
            </>
          )}
          <Link to={`/shelter/${shelterID}/blogs`} className="blog-name">
            <h2>{shelterInfo.shelter_name} Blog</h2>
          </Link>
        </div>
        <div className="col-sm-4">
          <h2>Contact Information</h2>
          <p>{shelterInfo?.email ?? ""}</p>
        </div>
      </div>
    </>
  );
}

export default ShelterInfo;
