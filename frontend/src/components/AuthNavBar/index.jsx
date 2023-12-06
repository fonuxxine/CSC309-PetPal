import { Outlet, Link } from "react-router-dom";
import "./style.css";

const isShelter = localStorage.getItem("is_shelter");
const username = localStorage.getItem("username");
const user_id = localStorage.getItem("user_id")
function AuthNavBar() {
  return (
    <>
      <header>
        {isShelter === "true" ? (
          <nav className="navbar nav-bar p-3 px-4">
            <div className="container-fluid">
              <Link className="navbar-brand logo" to="/">
                PetPal
              </Link>
              <div className="d-flex justify-content-end">
                <p className="navbar-nav pe-2 user-msg ">
                  Welcome, {username}!
                </p>
                <p className="navbar-nav pe-2">|</p>
                <Link className="navbar-nav links pe-4" to="/shelter/manage/">
                  Manage Shelter
                </Link>
                {/* Replace these links */}
                <Link className="navbar-nav links pe-4" to="/">
                  Notifications
                </Link>
                <Link className="navbar-nav links" to={`/update-account/${user_id}`}>
                  Account
                </Link>
              </div>
            </div>
          </nav>
        ) : (
          <nav className="navbar nav-bar p-3 px-4">
            <div className="container-fluid">
              <Link className="navbar-brand logo" to="/">
                PetPal
              </Link>
              <div className="d-flex justify-content-end">
                <p className="navbar-nav pe-2 user-msg ">
                  Welcome, {username}!
                </p>
                <p className="navbar-nav pe-2">|</p>
                {/* Replace these links */}
                <Link className="navbar-nav links pe-4" to="/">
                  Notifications
                </Link>
                <Link className="navbar-nav links" to="/">
                  Account
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default AuthNavBar;
