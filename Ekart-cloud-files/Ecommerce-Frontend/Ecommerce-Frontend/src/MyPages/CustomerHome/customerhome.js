import React from "react";
import { Helmet } from "react-helmet";
import appliances from "../images/appliances.jpg";
import grocery from "../images/grocery.jpg";
import laptops from "../images/laptops.jpg";
import mobiles from "../images/mobiles.jpg";
import styles from "./customerhome.module.css";
import Navigation from "../Components/Navigation";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setOrderItem } from "../../Auth";

const Customerhome = () => {

  const [items11, setItems11] = useState([]);
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const [tempSearchval, setTempSearchval] = useState("");
//   let finalString = dummyString.replace(/["]+/g, '')
  const s = "http://localhost:8081/items/trending";
      axios
        .get(s)
        .then((response) => {
          setItems11(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    const handlePayment = (item) => {
      navigate('/orderP', {state: {orderItem: item}});
    };


  const navigate1 = useNavigate();
  const handleCategoryClick = (value) => {
    navigate1("/grocery", { state: { catSel: value } });
  };
  return (
    <div>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>E-Mart Application</title>

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
      <div className={`${styles.body1} w-100`}>
        <Navigation />
        <div className={`d-flex gap-5 bg-primary ps-5 py-2 ${styles.feture}`}>
          <Link to="/myorders">
            <button className="btn fs-5 text-white py-0 px-2">
              <i className="bi bi-cart-check me-2 fs-3"></i>My Orders
            </button>
          </Link>
          <Link to="/wishlist">
            <button className="btn fs-5 text-white py-0 px-2">
              <i className="bi bi-bag-heart me-2 fs-3"></i>Wishlist
            </button>
          </Link>
          <Link to="/cart">
            <button className="btn fs-5 text-white py-0 px-2">
              <i className="bi bi-cart3 me-2 fs-3"></i>My Cart
            </button>
          </Link>
        </div>
        <div className="bg-body-secondary">
          <div className="">
            <h4 className="ps-3 py-1 fs-3">Categories</h4>
          </div>
        </div>
        <div className={` ${styles.cat} bg-warning d-flex`}>
          <a className="" href="" onClick={() => handleCategoryClick("grocery")}>
            <div className="card m-3">
              <img
                src={grocery}
                className={`${styles.card_img} rounded-2 img-thumbnail`}
                alt="..."
              />
              <h6
                className={`${styles.card_title} px-2 py-1 position-absolute bottom-0 start-0 rounded-4 text-light fs-3 fw-bold ms-2`}
              >
                {" "}
                Grocery{" "}
              </h6>
            </div>
          </a>

          <a className="" href="" onClick={() => handleCategoryClick("mobiles")}>
            <div className="card m-3">
              <img
                src={mobiles}
                className={`${styles.card_img} rounded-2 img-thumbnail`}
                alt="..."
              />
              <h6
                className={`${styles.card_title} px-2 py-1 position-absolute bottom-0 start-0 rounded-4 text-light   fs-3 fw-bold ms-2`}
              >
                Mobiles
              </h6>
            </div>
          </a>

          <a className="" href="" onClick={() => handleCategoryClick("laptops")}>
            <div className="card m-3">
              <img
                src={laptops}
                className={`${styles.card_img} rounded-2 img-thumbnail`}
                alt="..."
              />
              <h6
                className={`${styles.card_title} px-2 py-1 position-absolute bottom-0 start-0 rounded-4 text-light fs-3 fw-bold ms-2`}
              >
                Laptops
              </h6>
            </div>
          </a>

          <a className="" href="" onClick={() => handleCategoryClick("appliances")}>
            <div className="card m-3">
              <img
                src={appliances}
                className={`${styles.card_img} rounded-2 img-thumbnail`}
                alt="..."
              />
              <h6
                className={`${styles.card_title} px-2 py-1 position-absolute bottom-0 start-0 rounded-4 text-light fs-3 fw-bold ms-2`}
              >
                Appliances
              </h6>
            </div>
          </a>          
        </div>
      <div className="mt-3">
          <span className="m-0">
            <h4 className="ps-3 py-2 fs-3 text-white bg-info">Trending Products</h4>
          </span>
        </div>

        <div className="row row-cols-4">
            
            {items11.map((item) => (
                <div className="col-3" key={item.id} >
                <div className="card m-3 rounded-4 position-relative" style={{boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.4)'}}>
                <div className="image-container d-flex justify-content-center align-items-center">
                
                <img src={item.item_image} className="card-img-top rounded-4 rounded-bottom-0" style={{ width: '200px', height: '150px', objectFit: 'contain'}} alt="product_image"/>
            </div>
                    {/* <i className="btn bi bi-heart position-absolute top-0 fs-4 fw-bolder text-white"></i> */}
                    <div className="card-body" style={{backgroundColor: '#E0F2F1', }}>
                        <h6 className="card-title">{item.name}</h6>
                        <p className="card-text">Price : {item.price}&#8377;</p>
                        <button className="btn btn-info me-2" onClick={() => handlePayment(item)}>Buy Now</button>
                        <button className="btn btn-warning"><i className="bi bi-cart-plus me-1"></i>Wishlist</button>
                        {/* <!-- Modal button trigger --> */}
                        <a href="#" className="btn btn-outline-dark p-1 rounded-3 border-0 mt-1" data-bs-toggle="modal" data-bs-target={`#productModal${item.id}`}>More Details</a>
                        {/* <!-- Modal --> */}
                        <div className="modal fade" id={`productModal${item.id}`} tabindex="-1" aria-labelledby={`productModalLabel${item.id}`} aria-hidden="true">
                            <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                <h1 className="modal-title fs-5" id={`exampleModalLabel${item.id}`}>{item.name}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                <p>product id: {item.id}</p>
                                <p>product price: {item.price}</p>
                                <p>sub-category: {item.subcategory}</p>
                                <p>stock: {item.stock}</p>
                                <p>seller: {item.seller_mail}</p>
                                </div>
                                <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Ok</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>     ))}                     
        </div>


        {/* <div className={` ${styles.cat} bg-warning d-flex`}>
          <a className="text-center mb-2" href="" onClick={() => handleCategoryClick("grocery")}>
            <div className="card m-3 mb-0">
              <img
                src={grocery}
                className={`${styles.card_img} rounded-2 img-thumbnail`}
                alt="..."
              />
              <div className={`${styles.cont} px-2 py-1 position-absolute bottom-0 end-0  text-light fs-3 fw-bold bg-light`}>
                <h5 className="text-dark">&#8377;<span className="text-success pe-2">1000</span><del className="text-danger">2000</del></h5>
              </div>
            </div>
            <h5 className="text-dark">Product Name</h5>
          </a>       
        </div> */}
      </div>
    </div>
  );
};
export default Customerhome;
