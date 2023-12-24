import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../../Slices/userSlice";

function TopBar() {
  const userEmail = useSelector((state) => state.user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  function isLogin(userEmail) {
    if (userEmail === "" || userEmail === null) {
      return false;
    }
    return true;
  }
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        {/* Nav Item - User Information */}
        {isLogin(userEmail) ? (
          <div className="dropdown" style={{ marginRight: "1%" }}>
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userEmail}
            </button>
            <ul className="dropdown-menu">
              <li>
                <div
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                  // onClick={navigateToProfilePage}
                >
                  Profile
                </div>
              </li>
              <li>
                <div
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch(reset());
                    navigate("/signin");
                  }}
                >
                  Sign out
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signin" style={{ marginRight: "1%" }}>
            <h1>Signin</h1>
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default TopBar;
