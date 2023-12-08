import { useState } from "react";
function Reply({ reply, users }) {
  const [photoError, setPhotoError] = useState(false);
  return (
    <div key={reply?.id} className="row review mt-3 me-3 reply">
      <div className="d-sm-block col-4 col-sm-2 d-none profile-pic-container ms-xxl-5 ms-xl-4">
        {photoError ? (
          <img
            className="img-thumbnail img-fluid profile-pic"
            src="https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
            alt="Profile"
          />
        ) : (
          <img
            className="img-thumbnail img-fluid profile-pic"
            src={
              users?.users?.[reply.user_from]?.profile_pic ??
              "https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
            }
            alt="Profile"
            onError={() => {
              setPhotoError(true);
            }}
          />
        )}
      </div>
      <div className="d-none col-8 py-4 d-sm-flex flex-column justify-content-center">
        <h3 className="reviewer">
          {users?.users?.[reply.user_from]?.username ?? ""}
        </h3>
      </div>
      <p className="col12 d-block">{reply?.message ?? ""}</p>
    </div>
  );
}

export default Reply;
