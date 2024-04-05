import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "../images/logo.png";
import style from "./MainPage.module.css";

const Home = () => {
  return (
    <div>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>E-Mart Application</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossorigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Preahvihear&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className={`container-fluid ${style.body2}`}>
        <div className="row">
          <div className={`col-3 ${style.logo}`}>
            <img src={logo} alt="" />
            <h2>E-Mart</h2>
          </div>
          {/* <div
            className={`${style.nav_item} col-1 mt-3 fs-5 fw-bold text-white text-center align-self-center mx-1 rounded-pill`}
          >
            Home
          </div>
          <div
            className={`${style.nav_item} col-1 mt-3 fs-5 fw-bold text-white text-center align-self-center mx-1 rounded-pill`}
          >
            Contact
          </div>
          <div
            className={`${style.nav_item} col-1 mt-3 fs-5 fw-bold text-white text-center align-self-center mx-1 rounded-pill`}
          >
            About Us
          </div>
          <div
            className={`${style.nav_item} col-1 mt-3 fs-5 fw-bold text-white text-center align-self-center mx-1 rounded-pill`}
          >
            Services
          </div>
          <div
            className={`${style.nav_item} col-1 mt-3 fs-5 fw-bold text-white text-center align-self-center mx-1 rounded-pill`}
          >
            Products
          </div> */}
        </div>
        <div className={`row ${style.content} ps-5`}>
          <div className="col-7 align-self-center">
            <h3 className={`fs-1 ${style.tag} col-7 opacity-50`}>
              Celebrate Convenience, Shop with Ease!
            </h3>
            <p className={`col-10 ${style.desc}`}>
              Welcome to{" "}
              <span className={`text-light ${style.emart} fs-5`}>E-Mart</span>,
              your ultimate destination for all your shopping needs! We are a
              premier online marketplace committed to providing you with an
              exceptional shopping experience right from the comfort of your own
              home.
            </p>
            <div className="col-5">
              <Link to="/login">
                <button
                  className={`btn btn-outline-dark fw-bold mx-1 my-3 opacity-75 border-2 ${style.lbtn}`}
                  type="button"
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  className={`btn btn-outline-dark fw-bold mx-1 my-3 opacity-75 border-2 ${style.rbtn}`}
                  type="button"
                >
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
