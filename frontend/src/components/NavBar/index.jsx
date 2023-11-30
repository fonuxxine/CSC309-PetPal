import { Outlet, Link } from "react-router-dom";
import "./style.css";

function NavBar() {
  return (
    <>
      <header>
        <nav className="navbar nav-bar p-3 px-4">
          <div className="container-fluid">
            <Link className="navbar-brand logo" to="/">
              PetPal
            </Link>
            <Link className="navbar-nav links" to="/login/">
              Sign In
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  );
}

export default NavBar;
