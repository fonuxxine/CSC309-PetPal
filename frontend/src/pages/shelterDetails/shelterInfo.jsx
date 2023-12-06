import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ShelterInfo() {
  const navigate = useNavigate();
  const [shelterInfo, setShelterInfo] = useState({});
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
      <div className="container-fluid shelter-name-banner p-5">
        <div className="row h-100">
          <div className="h-100 justify-content-sm-center justify-content-md-end d-none d-sm-flex col-sm-4 col-md-3 col-lg-2">
            <img
              className="img-thumbnail img-fluid shelter-logo"
              src={
                shelterInfo?.profile_pic ??
                "https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
              }
              alt="Profile"
            />
          </div>
          <h1 className="col-12 col-sm-8 col-md-9 col-lg-10 justify-content-center mb-0 d-flex align-items-center shelter-name">
            {shelterInfo?.shelter_name ?? ""}
          </h1>
        </div>
      </div>
      <div className="row container-fluid text-center p-5">
        <div className="col-sm-6">
          <h2>Mission Statement</h2>
          <p>{shelterInfo?.mission_statement ?? ""}</p>
        </div>
        <div className="col-sm-6">
          {shelterInfo?.location === null || shelterInfo.location === "" ? (
            <></>
          ) : (
            <>
              <h2>Location</h2>
              <p>{shelterInfo.location}</p>
            </>
          )}
          <h2>Contact Information</h2>
          <p>{shelterInfo?.email ?? ""}</p>
        </div>
      </div>
    </>
  );
}

export default ShelterInfo;
