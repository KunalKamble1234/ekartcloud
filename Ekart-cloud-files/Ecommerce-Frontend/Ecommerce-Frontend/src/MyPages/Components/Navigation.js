import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";
import { setSearchval, getSearchval } from "../../Auth";

const Navigation = () => {
    const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tempSearchval, setTempSearchval] = useState("");

  

  const handleSearch = (tempSearchval) => {
    console.log("In handle search");
    console.log("tempSearchval: ", tempSearchval);
    setSearchval(tempSearchval);
    console.log("getSearchval(): ", getSearchval());
    let aaa = getSearchval();
    console.log("aaa: ", aaa);
    navigate("/gotosearch");
  };

  return (
    <div>
      <Helmet>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
          crossorigin="anonymous"
        ></script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Preahvihear&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className={`${styles.body1}`}>
        <div className={`d-flex justify-content-evenly ${styles.header} z-3 position-relative`}>
          <div
            className={`${styles.logo} col-2 d-flex justify-content-start align-items-center ps-4 py-2`}
          >
            <img
              className="col-3 rounded-circle"
              src={logo}
              alt="e-mart logo"
            />
            <h2 className="ms-3 text-light">E-Mart</h2>
          </div>
          <div className="col-4 d-flex justify-content-start align-items-center main-search">
            <div className={styles.search}>
              <input
                type="text"
                placeholder="Search your product here"
                onChange={(e) => setTempSearchval(e.target.value)}
              />
            </div>
            <div className={styles.search_btn}>
              <button
                className={styles.search_btn}
                onClick={() => {
                  console.log(tempSearchval);
                  handleSearch(tempSearchval);
                }}
              >
                <i className="bi bi-search fs-5"></i>
              </button>
            </div>
          </div>
          <div
            className={`${styles.profile} col-3 text-end align-self-center d-flex justify-content-end align-items-center`}
          >
            {/* <div className="btn-group"> */}
             <Link to="/profile">
              <button type="button" className="pro btn btn-light rounded-3">
                <i className="bi bi-person-circle text-black fw-bold fs-5 me-2"></i>
                Profile
              </button>
              </Link> 

              <Link to="/">
              <button type="button" className="btn btn-light mx-3 rounded-3">
                <i className="bi bi-person-circle text-black fw-bold fs-5 me-2"></i>
               LogOut
              </button>
              </Link>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
