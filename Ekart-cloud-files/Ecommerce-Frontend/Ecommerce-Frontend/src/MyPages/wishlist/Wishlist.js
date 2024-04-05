import React, {useState, useEffect} from 'react'
import logo from '../images/logo.png';
import {Link} from "react-router-dom";
import axios from "axios";
import { getLoggedInUser } from '../../Auth';
import styles from './Wishlist.module.css'
import { setOrderItem } from '../../Auth';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [items, setItems] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [tempSearchval, setTempSearchval] = useState("");
  const user17 = getLoggedInUser();
  const handleCategoryClick = (category) => {
    console.log("In handleCategoryClick");
    setSelectedCategory(category);
  };

  const handleSearch = (tempSearchval) => {
    console.log("In handle search");
    setSearchVal(tempSearchval);
  };

  let s17 = "http://localhost:8081/wishlist/"+user17.email+"/1";
  axios.get(s17)
  .then( (response)=> {
    setItems(response.data);
  } )
  .catch((error)=>{
    console.log(error);
  });
  const handlePayment = (item) => {
    navigate('/orderP', {state: {orderItem: item}});
};
  return (
    <>
    <div className="container-fluid">
    <div className={`row ${styles.header} z-3 position-relative`}>
            <div className={`${styles.logo} col-2 d-flex justify-content-start align-items-center ps-4 py-2`}>
                <img className="col-3 rounded-circle" src={logo} alt="e-mart logo" />
                <h2 className="ms-3 text-light">E-Mart</h2>
            </div>
            <div className="col-4 d-flex justify-content-start align-items-center main-search">
              
                <div className={styles.search}>
                    <input type="text" placeholder="Search your product here" onChange={(e) => setTempSearchval(e.target.value)}/>
                </div>
                <div className={styles.search_btn}>
                    <button className={styles.search_btn} onClick={() => { handleSearch(tempSearchval); }}>
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
                        <Link to="/profile"><li><p className="dropdown-item"><i className="bi bi-person me-2"></i>Profile</p></li></Link>
                        <li><p className="dropdown-item" ><i className="bi bi-pencil-square me-2"></i>Edit</p></li>
                        <Link to="/myorders"><li><a className="dropdown-item" href="#"><i className="bi bi-cart-check me-2"></i>My Orders</a></li></Link>
                        <Link to="/wishlist"><li><a className="dropdown-item" href="#"><i className="bi bi-bag-heart me-2"></i>Wishlist</a></li></Link>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <Link to="/"><li><a className="dropdown-item" href="#"><i className="bi bi-box-arrow-right"></i> Log Out</a></li></Link>
                    </ul>
                </div>
                <div className="my-cart ms-2">
                    <a className="btn btn-outline-light h-25" href="cart.html"><i className="bi bi-cart3 me-1"></i>My Cart</a>
                </div>
            </div>
        </div>
        <div className="row bg-body-secondary">
            <div className="col-2">
                <h4 className="px-2 py-1 mt-2 text-center text-white bg-danger rounded-pill col-7">Wishlist</h4>
            </div>
        </div>
        {items.map((item) => (
            <div className="row row-cols-1 mt-2"key={item.id}>
            <div className="p-2 bg-body-tertiary d-flex align-items-center">
                <img className="img-thumbnail col-1 ms-5" src={item.item_image} alt=""/>
                <div className="body ms-5">
                    <h5>Product Name: {item.name}</h5>
                    <p className="py-1 m-0">category: {item.category}</p>
                    <p className="py-1 m-0">Price: {item.price}</p>
                    <p classname="py-1 m-0">Current Stock: {item.stock}</p>
                </div>
                <button className={`btn btn-outline-warning ms-5 fw-bold ${styles.buy_btn}`} onClick={() => handlePayment(item)}>Buy Now</button>
            </div>
            
        </div>
        ))}
        
        
    </div>
    </>
  )
}

export default Wishlist;