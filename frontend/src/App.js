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
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;