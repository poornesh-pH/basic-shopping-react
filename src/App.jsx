import React, { useReducer } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import Cart from './Cart';
import Detail from './Detail';
//! import Detail from './DetailRefs';
import {Routes, Route} from 'react-router-dom'; 
import { useEffect } from "react";
import Checkout from "./Checkout";
import cartReducer from './services/cartReducer'

export default function App() {

  let initialCart;
    try {
      initialCart =  JSON.parse(localStorage.getItem("cart")) ?? [] // if left block is null, execute the second block (i.e) returns [] here
    }
    catch{
      console.log("the cart could not be parsed as JSON")
      initialCart = [];
    }
  
  //? const [state, dispatch] = useReducer(reducer,initialArg,init);
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  
  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart]) //dependent on cart array, whenever the cart changes the useEffect will be executed


  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
         <Route path="/" element={<h1>Welcome</h1>}/>
         <Route path="/:category" element={<Products/>}/>
         <Route path="/:category/:id" element={<Detail dispatch={dispatch}/>}/>
         <Route path="/cart" element={<Cart cart={cart} dispatch={dispatch}/>}/>
         <Route path="/checkout" element={<Checkout cart={cart} dispatch={dispatch}/>}/>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
