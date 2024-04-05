import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './MyPages/Login-Register/Login';
import Register from './MyPages/Login-Register/Register';
import MainPage from './MyPages/MainPage/MainPage';
import CustomerHome from './MyPages/CustomerHome/customerhome';
import Msg1 from './MyPages/msg1';
import ProfileCust from './MyPages/Profile/Profile';
import GroceryList from './MyPages/CategoryLists/GroceryList';
import Cart from './MyPages/Cart/Cart';
import Order from './MyPages/orders/Order';
import MyOrders from './MyPages/myOrders/MyOrders';
import Wishlist from './MyPages/wishlist/Wishlist';
import SearchedItem from './MyPages/CategoryLists/searchedItem';
import ManagerHome from './MyPages/manager/ManagerHome';
import AllItems from './MyPages/manager/AllItems';
import SuccessPage from './MyPages/orders/SuccessPage';
import ViewAllOrders from './MyPages/manager/ViewAllOrders (1)';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<MainPage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/rlogin" element={<div><Msg1/><Login/></div>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/chome" element={<CustomerHome/>} />
      <Route path="/profile" element={<ProfileCust/>} />
      <Route path="/cart" element={<Cart/>}/>  
      <Route path="/grocery" element={<GroceryList/>}/>
      <Route path="/orderP" element={<Order/>}/>
      <Route path="/myorders" element={<MyOrders/>}/>
      <Route path="/wishlist" element={<Wishlist/>}/>
      <Route path="/gotosearch" element={<SearchedItem/>}/>
      <Route path="/mhome" element={<ManagerHome/>}/>
      <Route path="/stock" element={<AllItems/>}/>
      <Route path="/successo" element={<SuccessPage/>}/>
      <Route path="/viewallorders" element={<ViewAllOrders/>}/>
      <Route path="/setdelivery" element={<hr/>} />
    </Routes>
  </Router>
  );
}

export default App;
