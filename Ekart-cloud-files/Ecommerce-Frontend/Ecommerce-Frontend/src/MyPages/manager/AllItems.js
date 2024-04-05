import React from 'react'
import Navigation from './Navigation'
import { useState } from 'react';
import axios from 'axios';

const AllItems = () => {

    const [items, setItems] = useState([]);
    const s = "http://localhost:8081/items";
    axios
    .get(s)
    .then((response) => {
      setItems(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <>
    
    <Navigation/>
    <div className="container-fluid">
        {items.map((item) =>(
            <>
            <hr className='my-1'/>
            <div className="item d-flex align-items-center gap-5 bg-body-tertiary p-4">
                <img className='rounded' src={item.item_image} alt="item_image" width='150' />
                <div className="content d-flex gap-2">
                    <div className="div1 d-flex flex-column gap-2 justify-content-center h-50">
                        <h6>Name: </h6>
                        <h6>Id: </h6>
                    </div>
                    <div className="div1 d-flex flex-column gap-2 justify-content-center pe-4 h-50">
                        <h6>{item.name} </h6>
                        <h6>{item.id} </h6>
                    </div>
                    <div className="div1 d-flex flex-column gap-2 justify-content-center border-start ps-4 h-50">
                        <h6>Category: </h6>
                        <h6>Sub-Category: </h6>
                    </div>
                    <div className="div1 d-flex flex-column gap-2 justify-content-center pe-4 h-50">
                        <h6>{item.category} </h6>
                        <h6>{item.subcategory} </h6>
                    </div>
                    <div className="div1 d-flex flex-column gap-2 justify-content-center border-start ps-4 h-50">
                        <h6>Price: </h6>
                        <h6>Stock: </h6>
                    </div>
                    <div className="div1 d-flex flex-column gap-2 justify-content-center pe-4 h-50">
                        <h6>{item.price} </h6>
                        <h6>{item.stock} </h6>
                    </div>
                    <div className="div1 d-flex flex-column gap-2 justify-content-center border-start ps-4 h-50">
                        <h6>Seller: </h6>
                    </div>
                    <div className="div1 d-flex flex-column gap-2 justify-content-center h-50">
                        <h6>{item.seller_mail} </h6>
                    </div>
                </div>
            </div>
            </>
        ))}
            
        </div>
    
    </>
  )
}

export default AllItems