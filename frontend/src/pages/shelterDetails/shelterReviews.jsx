import { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Review from "./review";
import {sendNotification} from "../notification/sendNotification";

let bearer = "Bearer " + localStorage.getItem("access_token");

function Reviews() {
  const navigate = useNavigate();
  const [shelterReviews, setShelterReviews] = useState([]);
  const [replies, setReplies] = useState({});
  const [users, setUsers] = useState({});
  const [errors, setErrors] = useState({});
  const [review, setReview] = useState({ rating: 0, message: "" });
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewNext, setReviewNext] = useState(true);
  const [reviewPrev, setReviewPrev] = useState(false);
  const { shelterID } = useParams();
  const ratingOptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];

  useEffect(() => {
    fetch(`/shelter/${shelterID}/reviews/?page=${reviewPage}`, {
      method: "GET",
    })
      .then((resp) => {
        if (resp.status >= 400) {
          navigate("/");
        }
        return resp.json();
      })
      .then((json) => {
        setReviewNext(json.next !== null);
        setReviewPrev(json.previous !== null);
        for (let i = 0; i < json.results.length; i++) {
          setReplies((replies) => {
            return {
              ...replies,
              [json.results[i].id]: json.results[i].replies,
            };
          });
        }
        setShelterReviews(json.results);
      });
  }, [replies.keys, shelterReviews.keys, shelterID, navigate, reviewPage]);

  async function handleReview() {
    fetch(`/shelter/${shelterID}/reviews/`, {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: review.message,
        rating: review.rating.value,
      }),
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
          setShelterReviews([...shelterReviews, json]);
          setReview({ rating: 0, message: "" });
        } else {
          setErrors(json);
        }
      });
    sendNotification(review.message + " - Rating: " + review.rating.value, shelterID, `/shelter/${shelterID}`);
  }

  useEffect(() => {
    fetch(`/accounts/all`, {
      method: "GET",
    })
      .then((resp) => {
        if (resp.status >= 400) {
          navigate("/");
        }
        return resp.json();
      })
      .then((json) => {
        let temp = {};
        for (let i = 0; i < json.results.length; i++) {
          temp[json.results[i].id] = json.results[i];
        }
        setUsers(temp);
      });
  }, [users.keys, navigate]);

  return (
    <>
      <div className="container-fluid p-5 pt-0">
        <div className="d-flex flex-wrap justify-content-between pb-2 separator align-items-center gap-2">
          <h1 className="my-0 ">Reviews</h1>
        </div>
        <div className="row review write-review mt-3">
          <div className="mt-3">
            <p className="form-label">Rating:</p>
            <Select
              className="form-control written-review-stars"
              options={ratingOptions}
              value={review.rating}
              onChange={(value) => setReview({ ...review, rating: value })}
            />
          </div>
          {errors.rating !== "" ? (
            <p className="error">{errors.rating}</p>
          ) : (
            <></>
          )}
          <div className="mt-3">
            <p className="form-label">Write Your Review:</p>
            <textarea
              rows="5"
              className="form-control"
              type="text"
              name="writen-review"
              value={review.message}
              onChange={(event) =>
                setReview({ ...review, message: event.target.value })
              }
            ></textarea>
          </div>
          {errors.message !== "" ? (
            <p className="error">{errors.message}</p>
          ) : (
            <></>
          )}
          <div className="d-flex justify-content-end my-2">
            <button
              className="btn btn-primary btn-outline-dark btn-review btn-review-sm"
              onClick={handleReview}
            >
              Submit
            </button>
          </div>
        </div>
        {shelterReviews.map((review) => (
          <Fragment key={review.id}>
            <Review
              review={review}
              users={{ users }}
              replies={replies}
              setReplies={setReplies}
            />
          </Fragment>
        ))}
        {reviewNext ? (
          reviewPrev ? (
            <div className="d-flex justify-content-between my-2">
              <button
                className="btn btn-primary btn-outline-dark btn-review"
                onClick={() => setReviewPage(reviewPage - 1)}
              >
                Prev
              </button>
              <button
                className="btn btn-primary btn-outline-dark btn-review"
                onClick={() => setReviewPage(reviewPage + 1)}
              >
                Next
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-end my-2">
              <button
                className="btn btn-primary btn-outline-dark btn-review"
                onClick={() => setReviewPage(reviewPage + 1)}
              >
                Next
              </button>
            </div>
          )
        ) : reviewPrev ? (
          <div className="d-flex justify-content-start my-2">
            <button
              className="btn btn-primary btn-outline-dark btn-review"
              onClick={() => setReviewPage(reviewPage - 1)}
            >
              Prev
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Reviews;
