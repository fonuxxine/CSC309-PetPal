import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Reply from "./reply";
import {sendNotification} from "../notification/sendNotification";

let bearer = "Bearer " + localStorage.getItem("access_token");

function Review({ review, users, replies, setReplies }) {
  const [errors, setErrors] = useState({});
  const [reply, setReply] = useState("");
  const [photoError, setPhotoError] = useState(false);

  async function handleReply() {
    fetch(`/reviews/${review.id}/replies/`, {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: reply }),
    })
      .then((resp) => {
        if (resp.status === 401) {
          return { message: "You need to log in first." };
        }
        return resp.json();
      })
      .then((json) => {
        console.log(json);
        if ("id" in json) {
          let temp = replies[review.id];
          temp.push(json);
          setReplies({
            ...replies,
            [review.id]: temp,
          });
          setReply("");
        } else {
          setErrors(json);
        }
      });
  }

  return (
    <div className="row review mt-3">
      <div className="d-block col-4 col-sm-3 col-lg-2 pt-3 ps-2 ps-sm-3">
        <div className="profile-pic-container ms-xxl-5 ms-xl-4">
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
                users?.users?.[review.user_from]?.profile_pic ??
                "https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
              }
              onError={() => {
                setPhotoError(true);
              }}
              alt="Profile"
            />
          )}
        </div>
      </div>
      <div className="col-8 pt-3 d-flex flex-column gap-4 justify-content-center">
        <h3 className="reviewer">
          {users?.users?.[review.user_from]?.username ?? ""}
        </h3>
        <div className="d-flex gap-3">
          <FaStar className={review.rating >= 1 ? "star selected" : "star"} />
          <FaStar className={review.rating >= 2 ? "star selected" : "star"} />
          <FaStar className={review.rating >= 3 ? "star selected" : "star"} />
          <FaStar className={review.rating >= 4 ? "star selected" : "star"} />
          <FaStar className={review.rating >= 5 ? "star selected" : "star"} />
        </div>
      </div>
      <p className="col12 d-block px-2 px-sm-5 pt-3">{review?.message ?? ""}</p>
      <div className="review reply write-review px-sm-5 mx-sm-5 mx-4">
        <div className="my-3">
          <p className="form-label">Write Your Reply:</p>
          <textarea
            rows="5"
            className="form-control"
            type="text"
            name="writen-review"
            value={reply}
            onChange={(event) => setReply(event.target.value)}
          />
        </div>
      </div>
      {errors.message !== "" ? (
        <p className="error">{errors.message}</p>
      ) : (
        <></>
      )}
      <div className="d-flex justify-content-end mb-2">
        <button
          className={
            "btn btn-primary btn-outline-dark btn-review btn-review-sm mb-1"
          }
          onClick={handleReply}
        >
          Reply
        </button>
      </div>
      {replies?.[review.id]?.length === 0 ? (
        <></>
      ) : (
        <details className="pb-4 px-sm-5 mx-sm-5 mx-4">
          <summary className="replies-dropdown">Show Replies</summary>
          <div className="replies">
            {replies?.[review.id]?.map((reply) => (
              <Reply key={reply?.id} reply={reply} users={users} />
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

export default Review;
