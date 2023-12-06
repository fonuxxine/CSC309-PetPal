import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ShelterPets() {
  const navigate = useNavigate();
  const [petsInfo, setPetsInfo] = useState([]);
  const { shelterID } = useParams();
  const [petsPage, setPetsPage] = useState(1);
  const [petsNext, setPetsNext] = useState(true);
  const [petsPrev, setPetsPrev] = useState(false);
  const status = {
    AV: "Available",
    AD: "Adopted",
    PN: "Pending",
    WD: "Withdrawn",
  };

  useEffect(() => {
    fetch(
      `/pet-listings/?shelterID=${shelterID}&page=${petsPage}&status=AV,AD,PN,WD`,
      {
        method: "GET",
      }
    )
      .then((resp) => {
        if (resp.status >= 400) {
          navigate("/");
        }
        return resp.json();
      })
      .then((json) => {
        setPetsNext(json.next !== null);
        setPetsPrev(json.previous !== null);
        setPetsInfo(json.results);
      });
  }, [shelterID, navigate, petsPage]);

  return (
    <div className="row container-fluid p-5 pt-0">
      <h1 className="separator">List of Pets</h1>
      <div className="d-flex gap-4 pet-cards flex-wrap justify-content-center">
        {petsInfo.map((pet) => (
          <Link
            key={pet.id}
            className="card card-pet"
            to={`/pet-listing/${pet.id}/`}
          >
            <img
              src="https://i.pinimg.com/736x/bb/12/03/bb12038681429c0e313c3001a973ef0f.jpg"
              className="card-img-top card-pet-img-top"
              alt="Pet"
            />
            <div className="card-body card-pet-body">
              <h3 className="card-text card-pet-text">
                {pet.name} - {pet.type} - {pet.age}
              </h3>
              <p className="card-text card-pet-text">
                {status[pet.status]} - Posted:{" "}
                {pet.publication_date.split("T")[0]}
              </p>
              <p className="card-text card-pet-text">{pet.description}</p>
            </div>
          </Link>
        ))}
      </div>
      {petsNext ? (
        petsPrev ? (
          <div className="d-flex justify-content-between my-2">
            <button
              className="btn btn-primary btn-outline-dark btn-review"
              onClick={() => setPetsPage(petsPage - 1)}
            >
              Prev
            </button>
            <button
              className="btn btn-primary btn-outline-dark btn-review"
              onClick={() => setPetsPage(petsPage + 1)}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="d-flex justify-content-end my-2">
            <button
              className="btn btn-primary btn-outline-dark btn-review"
              onClick={() => setPetsPage(petsPage + 1)}
            >
              Next
            </button>
          </div>
        )
      ) : petsPrev ? (
        <div className="d-flex justify-content-start my-2">
          <button
            className="btn btn-primary btn-outline-dark btn-review"
            onClick={() => setPetsPage(petsPage - 1)}
          >
            Prev
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ShelterPets;
