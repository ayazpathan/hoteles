import React from "react";
import Link from "next/link";

const Header = () => {
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
