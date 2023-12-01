import "./style.css";
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
            <a href="pet_creation.html" className="ms-3 p-1">
              <button className="add-but" type="submit">
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
          <div className="col-sm-4 pets p-1">
            <figure className="figure" key={pet.id}>
              <img className="pets-img " src={pet.photo} alt={pet.name} />
              <a href="..." className="pet-description">
                <figcaption className="figure-caption pet-description">
                  {pet.name}
                </figcaption>
              </a>
              <>
                {" "}
                {shelter ? (
                  <>
                    <a href="pet_update.html">
                      <button className="manage-but me-2">Update Pet</button>
                    </a>
                    <button
                      className="manage-but"
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
