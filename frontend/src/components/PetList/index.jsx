import "./style.css";
// change when pet detail is done, pass in id to petDetail
const petDetailPage = "...";

function PetList(pets) {
  return (
        <div className="col">
          <h1 className="pets-h1">All Pets</h1>
          <div className="row p-1">
            {pets.pets.map((pet) => (
              <div className="col-sm-4 pets p-1">
                <figure className="figure" key={pet.id}>
                  <img className="pets-img " src={pet.photo} alt={pet.name} />
                  <a href="..." className="pet-description">
                    <figcaption className="figure-caption pet-description">
                      {pet.name}
                    </figcaption>
                  </a>
                </figure>
              </div>
            ))}
          </div>
        </div>
  );
}

export default PetList;
