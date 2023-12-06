import "./style.css";
import ShelterUpdate from "./shelterUpdate";
import UserUpdate from "./userUpdate";

function UpdateAccount() {
    return localStorage.getItem("is_shelter") ? <ShelterUpdate/>: <UserUpdate/>
}

export default UpdateAccount;