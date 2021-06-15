import React from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className="navbar-brand">
            <Link href="/">
              <span className="logo-site" title="Hoteles">
                Hoteles
              </span>
            </Link>
          </div>
        </div>

        <div className="search-container-ab">
          <div className="search-btn-container"></div>
        </div>

        <div className="col-3 mt-3 mt-md-0 text-center">
          <Link href="/login">
            <a className="btn btn-danger px-4 text-white login-header-btn float-right">
              Login
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
