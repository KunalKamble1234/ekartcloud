import React from 'react'
import Navigation from './Navigation'
import axios from 'axios';
import { useState } from 'react';

const ViewAllOrders = () => {

    const [orders, setOrders] = useState([]);
    const s = "http://localhost:8081/orders";
    axios
    .get(s)
    .then((response) => {
      setOrders(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

    return(
        <>
        <Navigation/>
        <div className="container-fluid">
            <h2>All Orders</h2>
            {orders.map((order) =>(
                <>
                <hr className='my-1'/>
                <div className="item d-flex gap-5 bg-body-tertiary p-4">
                    <img className='rounded' src="https://source.unsplash.com/1000x1000/bike" alt="item_image" width='200' />
                    <div className="content-product">
                        <h5 className='p-0 m-0'>Product Details</h5><hr className='p-0 mt-1 mb-2' />
                        <div className='d-flex gap-2'>
                        <div className="div1 d-flex flex-column gap-2">
                            <h6>Product ID: </h6>
                            <h6>Product quantity: </h6>
                            <h6>Product Price: </h6>
                        </div>
                        <div className="div1 d-flex flex-column gap-2">
                            <h6>{order.item_id}</h6>
                            <h6>{order.quantity}</h6>
                            <h6>{order.amount_paid}</h6>
                        </div>
                        </div>
                    </div>
                    <div className="content-order">
                        <h5 className='p-0 m-0'>Order Details</h5><hr className='p-0 mt-1 mb-2' />
                        <div className='d-flex gap-2'>
                        <div className="div1 d-flex flex-column gap-2">
                            <h6>Customer mail: </h6>
                            <h6>Order Id: </h6>
                            <h6>Date: </h6>
                        </div>
                        <div className="div1 d-flex flex-column gap-2">
                            <h6>{order.customer_email}</h6>
                            <h6>{order.order_id}</h6>
                            <h6>{order.odate}</h6>
                        </div>
                        </div>
                    </div>
                </div>
                </>
            ))}
            
            
        </div>
        
        </>
    )
}

export default ViewAllOrders