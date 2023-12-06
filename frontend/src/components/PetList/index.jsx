import "./style.css";
import { Link } from "react-router-dom";
// change when pet detail is done, pass in id to petDetail
const petDetailPage = "...";
const userID = localStorage.getItem("user_id");
const deleteURL = "/shelter-listings/" + userID + "/pet/";
var bearer = "Bearer " + localStorage.getItem("access_token");

function PetList({ pets, shelter }) {
  async function removePet(id) {
    await fetch(deleteURL + id, {
      method: "DELETE",
      headers: {
        Authorization: bearer,
      },
    }).then();

    window.location.href = "/shelter/manage";
  }

  return (
    <div className="col">
      <div className="container-fluid d-inline-flex ">
        <h1 className="pets-h1">All Pets</h1>
        <>
          {shelter ? (
            <a href={`/shelter-listings/${userID}/`} className="ms-3 p-1">
              <button className="add-but p-2">
                + New Pet
              </button>{" "}
            </a>
          ) : (
            <></>
          )}
        </>
      </div>

      <div className="row p-1">
        {pets.map((pet) => (
          <div key={pet.id} className="col-sm-4 pets p-1">
            <figure className="figure" >
              <img className="pets-img " src={pet.photo} alt={pet.name} />
              {/* <a href="..." className="pet-description"> */}
              <Link to={`/pet-listing/${pet.id}/`} className="pet-description">
                <figcaption className="figure-caption pet-description">
                  {pet.name}
                </figcaption>
              {/* </a> */}
              </Link>
              <>
                {" "}
                {shelter ? (
                  <>
                    <Link to={`/shelter/manage/${pet.id}/`}>
                      <button className="manage-but me-1 p-2">Update Pet</button>
                    </Link>
                    <button
                      className="manage-but p-2"
                      onClick={() => removePet(pet.id)}
                    >
                      Remove Pet
                    </button>{" "}
                  </>
                ) : (
                  <></>
                )}
              </>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PetList;
