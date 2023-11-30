import { Outlet, Link } from "react-router-dom";
import "./style.css";

function AuthNavBar() {
  return (
    <>
      <header>
        <nav className="navbar nav-bar p-3 px-4">
          <div className="container-fluid">
            <Link className="navbar-brand logo" to="/">
              PetPal
            </Link>
            <div class="d-flex justify-content-end">
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
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default AuthNavBar;
