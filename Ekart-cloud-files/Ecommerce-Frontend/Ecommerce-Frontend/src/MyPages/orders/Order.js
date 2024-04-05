import React from 'react'
import styles from './Order.module.css'
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import axios from "axios";
import { useEffect } from "react";
import { getLoggedInUser, getOrderItem, setLoggedInUser } from '../../Auth';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const getCurrentDateAsString = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
  
        return formattedDate;
      };
    const mydate = getCurrentDateAsString();
    const item11 = location.state.orderItem;
    const user11 = getLoggedInUser();
    const [errorMessage, setErrorMessage] = useState(<p></p>);
    const doPayment= ()=>{
        if(item11.price <= user11.balance)
        {
            let s22 = "http://localhost:8081/orders";
            axios.put(s22, {
                customer_email: user11.email,
                item_id: item11.id,
                odate: mydate,
                quantity: 1,
                amount_paid: item11.price
            })
            .then(response =>{
                if(response.data === "success")
                {
                    let user121 = getLoggedInUser();
                    let email112 = user121.email;
                    const s='http://localhost:8081/customers/'+email112;
                    axios.get(s)
                    .then(response =>{
                        let aaa = response.data;
                        setLoggedInUser(aaa);
                    })
                    navigate('/successo');
                }
                else
                {
                    navigate('/chome');
                }
            })
        }
        else
        {
            setErrorMessage(
                <p class="emessage">Insufficient balance</p>
            )
        }
    }
//   )}

 

  return (
    <>
    <div className={`container-fluid ${styles.body5}`}>
        <div className={`row ${styles.header} z-3 position-relative`}>
                <div className={`${styles.logo} col-2 d-flex justify-content-start align-items-center ps-4 py-2`}>
                    <img className="col-3 rounded-circle" src={logo} alt="e-mart logo" />
                    <h2 className="ms-3 text-light">E-Mart</h2>
                </div>
                <div className="col-4 d-flex justify-content-start align-items-center main-search">
                    {/* <div className="categories">
                        <select name="categories" id="cat">
                            <option value="#">All</option>
                            <option value="#">Product</option>
                            <option value="#">Product</option>
                            <option value="#">Product</option>
                            <option value="#">Product</option>
                        </select>
                    </div>  */}
                    <div className={styles.search}>
                        <input type="text" placeholder="Search your product here" />
                    </div>
                    <div className={styles.search_btn}>
                        <button className={styles.search_btn} >
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
                            <Link to="/profile"><li><a className="dropdown-item" href="#"><i className="bi bi-person me-2"></i>Profile</a></li></Link>
                            <li><a className="dropdown-item" href="#"><i className="bi bi-pencil-square me-2"></i>Edit</a></li>
                            <li><a className="dropdown-item" href="#"><i className="bi bi-cart-check me-2"></i>My Orders</a></li>
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

            <div className={styles.container}>
                <h1 className={styles.h1}>Order Summary</h1>
                <table className={styles.table}>
                    <tr>
                        <th className={`${styles.th}`}>Product Name:</th>
                        <th className={`${styles.th}`}>Quantity</th>
                        <th className={`${styles.th}`}>Price per Unit</th>
                        <th className={`${styles.th}`}>Total</th>
                    </tr>
                    <tr>
                        <td className={`${styles.td}`}>{item11.name}</td>
                        <td className={`${styles.td}`}>1</td>
                        <td className={`${styles.td}`}>Rs. {item11.price}</td>
                        <td className={`${styles.td}`}>Rs. {item11.price}</td>
                    </tr>
                    <tr>
                        <td colspan="3" className={`${styles.total_label} ${styles.td}`}>Total</td>
                        <td className={`${styles.total_value} ${styles.td}`}>Rs. {item11.price}</td>
                    </tr>
                </table>
                <div className="row d-flex justify-content-center mt-5">
                    <button className="btn btn-warning w-25 fw-bold fs-4 text-white p-0" onClick={() => doPayment()}> Pay</button>
                </div>
                {errorMessage}
            </div>
    </div>
    </>
    )
}

export default Order;