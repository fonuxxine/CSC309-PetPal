import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AuthNavBar from "./components/AuthNavBar";
import Landing from "./pages/landing";
import Login from "./pages/login";
import ManagePets from "./pages/manage";
import Applications from "./pages/applications";
import Application from "./pages/application";
import Notification from "./pages/notification";
import Notifications from "./pages/notifications";
import PetCreation from "./pages/petCreation";
import SignUp from "./pages/signup";
import SignUpPetSeeker from "./pages/petSeekerSignup";
import SignUpShelter from "./pages/shelterSignUp";
import PetDetail from "./pages/petDetail";
import PetAdoption from "./pages/petAdoption";
import PetUpdate from "./pages/petUpdate";
import UpdateAccount from "./pages/accountUpdate"
import ShelterDetails from "./pages/shelterDetails";
import AllShelters from "./pages/allShelters";
import PetSeekerDetail from "./pages/petSeekerDetail";
import Message from "./pages/message";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={localStorage.getItem('access_token') === null? <NavBar/> : <AuthNavBar/>}>
            <Route index element={<Landing/>} />
            <Route path="login/" element={<Login />} />
            <Route path="/shelter/manage/" element={<ManagePets/>}/>
            <Route path="pet-listing/:petID/applications/" element={<Applications/>}/>
            <Route path="applications/:applicationID/" element={<Application/>}/>
            <Route path="shelter-listings/:shelterID/" element={<PetCreation/>}/>
            <Route path="user/:userID/notifications/" element={<Notifications/>}/>
            <Route path="notifications/:notificationID/" element={<Notification/>}/>
            <Route path="signup/" element={<SignUp />} />
            <Route path="signup/pet-user/" element={<SignUpPetSeeker />} />
            <Route path="signup/shelter/" element={<SignUpShelter />} />
            <Route path="update-account/:accountID" element={<UpdateAccount />} />
            <Route path="shelter/manage/:petID" element={<PetUpdate />} />
            <Route path="shelter/:shelterID" element={<ShelterDetails/>}/>
            <Route name="pet-details" path="pet-listing/:petID/" element={<PetDetail />} />
            <Route path="pet-listing/:petID/adoption/" element={<PetAdoption />} />
            <Route path="shelter/" element={<AllShelters />} />
            <Route path="user/:userID/" element={<PetSeekerDetail />} />
            <Route path="applications/:appID/messages/" element={<Message />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;