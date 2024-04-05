import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import styles from './MyOrders.module.css';
import { getLoggedInUser } from '../../Auth';
import Navigation from '../Components/Navigation'
import BackButton from '../Components/BackButton';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user12 = getLoggedInUser();
  const s12 = 'http://localhost:8081/orders/customer/' + user12.email;
  const s13 = 'http://localhost:8081/items/customer/' + user12.email;

  useEffect(() => {
    // Fetch orders data
    axios.get(s12).then((response) => {
      setOrders(response.data);
    });

    // Fetch items data
    axios.get(s13).then((response) => {
      setItems(response.data);
      console.log(items);
      setLoading(false); // Set loading to false after data is fetched
    });
  }, [s12, s13]);

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while fetching data
  }

  return (
    <div>
      <Navigation/>

        <div className="bg-primary d-flex">
          <div className="col-2">
            <h4 className="p-2 mt-2 text-center text-white mx-5 fs-3">My Orders</h4>
          </div>
          <div className="col-2 mt-2">
            <Link to='/chome'><button className='btn btn-outline-light border-3 fw-bold fs-5 rounded-pill py-1'>Home</button></Link>
          </div>
        </div>

        {orders.map((order) => {
          // Find the item details corresponding to the current order
          const item = items.find((item) => item[0] === order.item_id);

          return (
            <div key={order.item_id} className="row-cols-1 mt-4 mx-5">
              <div className="p-2 bg-body-secondary d-flex align-items-center gap-5 rounded-5">
                {/* Display item image using the item details */}
                <img className="img-thumbnail col-2 ms-5" src={item[7]} alt={item[1]} />
                <div className="body ms-5">
                  {/* Display item name using the item details */}
                  <h5>{item[1]}</h5>
                  <p className="py-1 m-0 fs-5">Product id: {order.item_id}</p>
                  <p className="py-1 m-0 fs-5">Amount paid: {order.amount_paid}</p>
                  <p className='fw-bold'>Order Date: {order.odate}</p>
                  {/* ... Other order details ... */}
                  <p className='fw-bold'>Quantity: {order.quantity}</p>
                </div>
                <span className='text-white bg-success rounded-pill py-1 px-3 ms-5 fs-5 fw-bold'>Delivered
                <p className='fs-6'>On: {order.odate}</p>
                </span>
                <span className='text-white bg-warning rounded-pill py-1 px-3 ms-5 fs-5'>On the way...</span>
              </div>
            </div>
          );
        })}
        <BackButton/>
      </div>

  );
};

export default MyOrders;
