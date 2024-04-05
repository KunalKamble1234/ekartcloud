import React, { useState, useEffect } from 'react'
import styles from './Cart.module.css'
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../Auth';
import Navigation from '../Components/Navigation';
import BackButton from '../Components/BackButton';

const Cart = () => {

  const getCurrentDateAsString = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };
  const mydate = getCurrentDateAsString();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({}); // State to track quantities

  const user = getLoggedInUser();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/wishlist/${user.email}/2`);
        setItems(response.data);
        // Initialize quantities with default value of 1 for each item
        const initialQuantities = {};
        response.data.forEach(item => {
          initialQuantities[item.id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, [user.email]);

  const handleQuantityChange = (itemId, value) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: value
    }));
  };
  const [isBalanceInsufficient, setIsBalanceInsufficient] = useState(false);
  const handlePlaceOrder = async () => {
    console.log("Calculated price: " + calculateTotalPrice() + ", user balance: " + user.balance);
    try {
      if (calculateTotalPrice() > user.balance) {
        console.log("in if");
        setIsBalanceInsufficient(true);
      }
      else {
        setIsBalanceInsufficient(false);
        for (const item of items) {
          const order = {
            customer_email: user.email,
            item_id: item.id,
            odate: mydate,
            quantity: quantities[item.id],
            amount_paid: item.price
          };
          console.log("item id: " + item.id + ", data: ");
          console.log(order);

          await axios.put('http://localhost:8081/orders', order);

          let s16 = "http://localhost:8081/wishlist";
          const data = {
            item_id: item.id,
            customer_email: user.email,
            type: 2
          };
          axios.delete(s16, { data })
            .then((response) => {
              console.log(response);
            })

        }
        navigate('/successo');
      }

    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    items.forEach(item => {
      totalPrice += item.price * quantities[item.id];
    });
    return totalPrice;
  };

  return (
    <>
      <div className="container-fluid position-relative">
        <Navigation />
        <div className="row row-cols-2 bg-body-secondary d-flex align-items-center justify-content-between">
          <h4 className="px-2 py-1 mt-2 text-white bg-success rounded-pill col-1 text-center mx-2">YOUR CART</h4>
          <button className='btn btn-primary float-end' onClick={handlePlaceOrder}>Place Order</button>
        </div>
        {isBalanceInsufficient && (
          <div className="alert alert-danger mt-3">
            Not sufficient balance
          </div>
        )}
        <div className="d-flex justify-content-end mt-2">
          <h5>Total Price: &#8377;{calculateTotalPrice()}</h5>
        </div>
        <div className="d-flex justify-content-end mt-2">
          <h5>Your Balance: &#8377;{user.balance}</h5>
        </div>
        <div className="row row-cols-1 mt-2">
          {items.map(item => (
            <div key={item.id} className="p-2 bg-body-tertiary d-flex align-items-center">

              {/* ... Item details ... */}
              <img className="img-thumbnail col-2 ms-5" src={item.item_image} alt="" />
              <div className="body ms-5">
                <h5>{item.name}</h5>
                <p>Item id: {item.id}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
              </div>
              {/* ... Item details ... */}
              <p>Quantity: <input
                className="p-0 w-25 border-2 border-info ps-1 rounded-1 ms-4"
                type="number"
                value={quantities[item.id]}
                onChange={e => handleQuantityChange(item.id, e.target.value)}
              /></p>
            </div>
          ))}
        </div>
        <BackButton />
      </div>
    </>
  )
}

export default Cart;