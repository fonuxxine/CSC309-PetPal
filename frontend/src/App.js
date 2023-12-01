import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AuthNavBar from "./components/AuthNavBar";
import Landing from "./pages/landing";
import Login from "./pages/login";
import ManagePets from "./pages/manage";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={localStorage.getItem('access_token') === null? <NavBar/> : <AuthNavBar/>}>
            <Route index element={<Landing/>} />
            <Route path="login/" element={<Login />} />
            <Route path="/shelter/:id/manage/" element={<ManagePets/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
