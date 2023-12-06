import "./style.css";
import ShelterPets from "./shelterPets";
import Reviews from "./shelterReviews";
import ShelterInfo from "./shelterInfo";

function ShelterDetails() {
  return (
    <>
      <ShelterInfo />
      <ShelterPets />
      <Reviews />
    </>
  );
}

export default ShelterDetails;
