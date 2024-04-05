import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import logo from '../images/logo.png';
import { Link } from "react-router-dom";
import axios from "axios";
// import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import styles from './CategoryList.module.css';
import { setOrderItem } from '../../Auth';
import { setSearchval, getSearchval } from '../../Auth';
import { getLoggedInUser } from '../../Auth';

const GroceryList = () => {

  const user15 = getLoggedInUser();
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);
    let s16 = "http://localhost:8081/wishlist";

    if (!isItemInCart) {
      setCartItems([...cartItems, item]);
      let s17 = "" + user15.email + "";
      const data = {
        item_id: item.id,
        customer_email: s17,
        type: 2
      };
      console.log("data: ", data)
      console.log("usermail: ", user15.email);
      axios.put(s16, data)
        .then((response) => {
          console.log(response);
        })

      showSuccessMessage();

    }
    else {
      const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
      setCartItems(updatedCartItems);
      let s17 = "" + user15.email + "";
      const data = {
        item_id: item.id,
        customer_email: s17,
        type: 2
      };

      axios.delete(s16, { data })
        .then((response) => {
          console.log(response);
        })
      RemoveMessage();

    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);

  const showSuccessMessage = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const RemoveMessage = () => {
    setShowPopup1(true);
    setTimeout(() => setShowPopup1(false), 3000);
  };
  const location = useLocation();
  const cat = location.state.catSel;
  // const location = useLocation();
  // const {category} = props.match.params.category;
  // const [selectedCategory, setSelectedCategory] = useState("");
  //   const selectedCategory = location?.state?.selectedCategory || 'grocery';
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const [tempSearchval, setTempSearchval] = useState("");
  const s = "http://localhost:8081/items/" + cat;
  axios
    .get(s)
    .then((response) => {
      setItems(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  const handlePayment = (item) => {
    navigate('/orderP', { state: { orderItem: item } });
  };
  const handleSearch = (tempSearchval) => {
    console.log("In handle search");
    console.log("tempSearchval: ", tempSearchval);
    setSearchval(tempSearchval);
    console.log("getSearchval(): ", getSearchval());
    let aaa = getSearchval();
    console.log("aaa: ", aaa);
    navigate('/gotosearch');
  };

  const [likedItems, setLikedItems] = useState([]);

  const isLiked = (itemId) => likedItems.includes(itemId);

  const handleLike = (itemId) => {
    if (isLiked(itemId)) {
      setLikedItems((prevLikedItems) => prevLikedItems.filter((id) => id !== itemId));
      //   let s16 = "http://localhost:8081/wishlist"
      let s16 = "http://localhost:8081/wishlist";
      const data = {
        item_id: itemId,
        customer_email: user15.email,
        type: 1
      };
      console.log("data for wishlist:", data)
      axios.delete(s16, { data })
        .then((response) => {
          console.log(response);
        })
      RemoveMessage();
    } else {
      setLikedItems((prevLikedItems) => [...prevLikedItems, itemId]);
      let s15 = "http://localhost:8081/wishlist"

      axios.put(s15, {
        item_id: itemId,
        customer_email: user15.email,
        type: 1
      })
        .then((response) => {
          console.log(response);
        })
      showSuccessMessage();
    }
  };

  return (
    <div>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>E-Mart Application</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Preahvihear&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
      </Helmet>
      <div className="container-fluid">
        <div className={`row ${styles.header} z-3 position-relative`}>
          <div className={`${styles.logo} col-2 d-flex justify-content-start align-items-center ps-4 py-2`}>
            <img className="col-3 rounded-circle" src={logo} alt="e-mart logo" />
            <h2 className="ms-3 text-light">E-Mart</h2>
          </div>
          <div className="col-4 d-flex justify-content-start align-items-center main-search">
            <div className={styles.search}>
              <input type="text" placeholder="Search your product here" onChange={(e) => setTempSearchval(e.target.value)} />
            </div>
            <div className={styles.search_btn}>
              <button className={styles.search_btn} onClick={() => { console.log(tempSearchval); handleSearch(tempSearchval); }}>
                <i className="bi bi-search fs-5"></i>
              </button>
            </div>
          </div>
          <div className={`${styles.profile} col-3 offset-2 text-end align-self-center d-flex justify-content-end align-items-center`}>
            <div className="btn-group">
              <button type="button" className="pro btn btn-light">
                <i className="bi bi-person-circle text-black fw-bold fs-5 me-2"></i>Account
              </button>
              <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown" aria-expanded="false">
                <span className="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                <Link to="/profile"><li><a className="dropdown-item"><i className="bi bi-person me-2"></i>Profile</a></li></Link>
                <li><a className="dropdown-item" href="#"><i className="bi bi-pencil-square me-2"></i>Edit</a></li>
                <Link to="/myorders"><li><a className="dropdown-item" href="#"><i className="bi bi-cart-check me-2"></i>My Orders</a></li></Link>
                <Link to="/wishlist"><li><a className="dropdown-item" href="#"><i className="bi bi-bag-heart me-2"></i>Wishlist</a></li></Link>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <Link to="/"><li><a className="dropdown-item" href="#"><i className="bi bi-box-arrow-right"></i> Log Out</a></li></Link>
              </ul>
            </div>
            <Link to="/cart">
              <div className="my-cart ms-2">
                <a className="btn btn-outline-light h-25" href="cart.html"><i className="bi bi-cart3 me-1"></i>My Cart</a>
              </div>
            </Link>
          </div>
        </div>
        <div className="row bg-body-secondary">
          <div className="col-1">
            <h4 className="px-2 py-1 mt-2 text-white bg-success rounded-pill">{cat}</h4>
          </div>
          {showPopup && (
            <div style={{
              fontFamily: "sans-serif",
              backgroundColor: "#2ecc71", // Background color
              color: "#ffffff", // Text color
              padding: "8px 16px", // Padding
              borderRadius: "4px", // Border radius
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Shadow
              position: "absolute",
              top: "40px",
              right: "50px",
              left: "50px",
              zIndex: 3,
              marginLeft: "20px", // Leaving space from the left side
              marginRight: "100px", // Leaving space from the right side
              height: "40px", // Increased height
            }}>
              Successfully added
            </div>

          )}
          {showPopup1 && (
            <div style={{
              fontFamily: "sans-serif",
              backgroundColor: "red", // Background color
              color: "#ffffff", // Text color
              padding: "8px 16px", // Padding
              borderRadius: "4px", // Border radius
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Shadow
              position: "absolute",
              top: "40px",
              right: "50px",
              left: "50px",
              zIndex: 3,
              marginLeft: "20px", // Leaving space from the left side
              marginRight: "100px", // Leaving space from the right side
              height: "40px", // Increased height
            }}>
              Successfully Removed
            </div>

          )}

        </div>
        <div className="row row-cols-4">
          {items.map((item) => (
            <div className="col-3" key={item.id}>
              <div className="card m-3 rounded-4 position-relative" style={{ boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.4)' }}>
                <div className="image-container d-flex justify-content-center align-items-center">

                  <img src={item.item_image} className="card-img-top rounded-4 rounded-bottom-0" style={{ width: '200px', height: '150px', objectFit: 'contain' }} alt="product_image" />
                </div>

                <i className={`  ${isLiked(item.id) ? "btn bi heart-icon bi bi-heart-fill text-danger position-absolute top-0 fs-4 fw-bolder" : "btn bi bi-heart position-absolute top-0 fs-4 fw-bolder text-black"} `} onClick={() => handleLike(item.id)}></i>
                {/* <i class="heart-icon bi bi-heart-fill text-danger"></i> */}
                {/* <i className="btn bi bi-heart position-absolute top-0 fs-4 fw-bolder text-danger" ></i> */}
                <div className="card-body" style={{ backgroundColor: '#DCEDC8', }}>
                  <h6 className="card-title">{item.name}</h6>
                  <p className="card-text">Price : {item.price}&#8377;</p>
                  <button className="btn btn-info me-2" onClick={() => handlePayment(item)}>Buy Now</button>
                  <button className="btn btn-warning" onClick={() => handleAddToCart(item)}><i className="bi bi-cart-plus me-1"></i>
                    {cartItems.some((cartItem) => cartItem.id === item.id) ? "Remove from Cart" : "Add to Cart"}
                  </button>
                  {/* <button className="btn btn-warning"><i className="bi bi-cart-plus me-1"></i>Add to Cart</button> */}

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
            </div>))}
        </div>
      </div>
    </div>
  )
}

export default GroceryList