import React from 'react'
import Navigation from './Navigation';
import { Link } from "react-router-dom";
import styles from './ManagerHome.module.css'
import { useRef } from 'react';
import axios from 'axios';
import { useState } from 'react';

const ManagerHome = () => {

    const [itemid, setItemid] = useState('');
    const [newstock, setNewstock] = useState('');
    const nameRef = useRef();
    const sellerRef = useRef();
    const catRef = useRef();
    const subcatRef = useRef();
    const priceRef = useRef();
    const stockRef = useRef();
    const imageRef = useRef();
    
    // const itemidRef = useRef();
    // const newstockRef = useRef();

    const [showPopup, setShowPopup] = useState(false);
    const showSuccessMessage = () => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 2 seconds
      };
    const addNew = () => {
       
        // event.preventDefault();
        const name = nameRef.current.value;
        const seller = sellerRef.current.value;
        const cat = catRef.current.value;
        const subcat = subcatRef.current.value;
        const price = priceRef.current.value;
        const stock = stockRef.current.value;
        const image = imageRef.current.value;
        const data = {
            name: name,
            price: price,
            category: cat,
            subcategory: subcat,
            stock: stock,
            seller_mail: seller,
            item_image: image
          };
        let s18 = "http://localhost:8081/items";
        axios.put(s18, data)
        .then((response)=>{
            console.log(response);
        })
        showSuccessMessage();
        console.log("hello");
    }   

    const updateStock = (event) =>{
        event.preventDefault();
        // const itemid = nameRef.current.value;
        // const newstock = newstockRef.current.value;
        let s19 = "http://localhost:8081/items/stock/"+itemid;
        axios.post(s19, {
            newstock: newstock
        })
        .then(response =>{
            console.log("updated");
        })
        showSuccessMessage();
    }

    return(
        <>
            <div className="container-fluid">
                <Link to='/mhome'>
                    <Navigation/>
                </Link>
                <div className={`${styles.manager_options} container m-5 rounded border border-2 pb-4 mx-auto col-3 shadow-lg`}>
                {showPopup && (
                  <div className="popup-message">
                    Successfully added item
                  </div>
            )}
                    <h3 className='p-3 pb-1'>Manage</h3>
                    <hr />
                    <div className="d-flex flex-column gap-4 justify-content-center align-items-center">
                        {/* <!-- Button trigger modal --> */}
                        <button type="button" className={`btn btn-warning w-50 ${styles.op} shadow-sm`} data-bs-toggle="modal" data-bs-target="#AddNewItem">
                        Add New Item
                        </button>
                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="AddNewItem" tabindex="-1" aria-labelledby="AddNewItemModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 fw-bold" id="AddNewItem">Add New Item</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                  <div className="d-flex flex-column gap-3 mx-3">
                                    <div className="d-flex flex-column">
                                      <label htmlFor="name" className="ps-1 fw-bold">
                                        Item Name
                                      </label>
                                      <input type="text" id="name" className="ps-2" ref={nameRef} />
                                    </div>
                                    <div className="d-flex flex-column">
                                      <label htmlFor="seller" className="ps-1 fw-bold">
                                        Seller email
                                      </label>
                                      <input type="text" id="seller" className="ps-2" ref={sellerRef} />
                                    </div>
                                    <div className="d-flex flex-column">
                                      <label htmlFor="cat" className="ps-1 fw-bold">
                                        Item Category
                                      </label>
                                      <input type="text" id="cat" className="ps-2" ref={catRef} />
                                    </div>
                                    <div className="d-flex flex-column">
                                      <label htmlFor="subcat" className="ps-1 fw-bold">
                                        Item Sub-Category
                                      </label>
                                      <input type="text" id="subcat" className="ps-2" ref={subcatRef} />
                                    </div>
                                    <div className="d-flex flex-column">
                                      <label htmlFor="price" className="ps-1 fw-bold">
                                        Item Price
                                      </label>
                                      <input type="text" id="price" className="ps-2" ref={priceRef} />
                                    </div>
                                    <div className="d-flex flex-column">
                                      <label htmlFor="stock" className="ps-1 fw-bold">
                                        Item Stock
                                      </label>
                                      <input type="text" id="stock" className="ps-2" ref={stockRef} />
                                    </div>
                                    <div className="d-flex flex-column">
                                      <label htmlFor="image" className="ps-1 fw-bold">
                                        Item image Link
                                      </label>
                                      <input type="text" id="image" className="ps-2" ref={imageRef} />
                                    </div>
                                    <button
                                      type="submit"
                                      className="btn btn-warning fw-bold"
                                      onClick={() =>addNew()}
                                    >
                                      Add
                                    </button>
                                  </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* <!-- Button trigger modal --> */}
                        <button type="button" className={`btn btn-warning w-50 ${styles.op} shadow-sm`} data-bs-toggle="modal" data-bs-target="#updateStock">
                        Update Stock
                        </button>
                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="updateStock" tabindex="-1" aria-labelledby="updateStockModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 fw-bold" id="updateStock">Update Stock</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={updateStock}>
                                <div className="d-flex flex-column gap-3 mx-3">
                                        <div className='d-flex flex-column'>
                                            <label htmlFor="itemid" className='fw-bold ps-1'>Enter item id</label>
                                            <input type="number" className='ps-2'  onChange={(e) => setItemid(e.target.value)}/>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <label htmlFor="itemid" className='fw-bold ps-1'>Enter updated stock</label>
                                            <input type="number" className='ps-2'  onChange={(e) => {setNewstock(e.target.value);console.log(newstock)}}/>
                                        </div>
                                        {showPopup && (
                  <div className="popup-message">
                    Successfully increased stock.
                  </div>
            )}
                                        <button type="submit" className="btn btn-warning fw-bold">Update</button>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>                                            
                    <Link to='/viewallorders'><button type='button' className='btn btn-warning w-100 shadow-sm'>View Orders</button></Link>
                    <Link to='/setDelivery'><button type='button' className='btn btn-warning w-100 shadow-sm'>Update Orders' Status</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManagerHome;