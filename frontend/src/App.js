import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AuthNavBar from "./components/AuthNavBar";
import Landing from "./pages/landing";
import Login from "./pages/login";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar/>}>
            <Route index element={<Landing/>} />
            <Route path="login/" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
