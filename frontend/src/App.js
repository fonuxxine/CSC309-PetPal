import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AuthNavBar from "./components/AuthNavBar";
import Landing from "./pages/landing";
import Login from "./pages/login";
import ManagePets from "./pages/manage";
import Applications from "./pages/applications";
import Application from "./pages/application";
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
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;