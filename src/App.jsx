import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import Cart from './Cart';
import Detail from './Detail';
// import Detail from './DetailRefs';
import {Routes, Route} from 'react-router-dom'; 
import { useEffect } from "react";
import Checkout from "./Checkout";

export default function App() {

  const [cart, setCart] = useState(()=>{
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [] // if left block is null executed the second block (i.e) returns [] here
    }
    catch{
      console.log("the cart could not be parsed as JSON")
      return [];
    }
  });
  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart]) //dependent on cart array, whenever the cart changes the useEffect will be executed

  const addToCart=(id,sku)=>{
    setCart(items =>{
      const itemsInCart = items.find(i=>i.sku===sku)
      if(itemsInCart){
       return items.map(i =>
        i.sku === sku ? {...i, quantity: i.quantity + 1 } : i
        )
      }
      else{
        return [...items,{id,sku,quantity:1}]
      }
    })
  }

  const updateQuantity=(sku,quantity)=>{
    setCart(items=>{
      return quantity===0 
        ? items.filter(i=> i.sku!==sku ) //remvoes item if quantity is selected Remove option
        :items.map(i =>i.sku === sku ? {...i, quantity } : i) // updates the quantity
    })
  }

 function emptyCart(){
   setCart([]);
 }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
         <Route path="/" element={<h1>Welcome</h1>}/>
         <Route path="/:category" element={<Products/>}/>
         <Route path="/:category/:id" element={<Detail addToCart={addToCart}/>}/>
         <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity}/>}/>
         <Route path="/checkout" element={<Checkout cart={cart} emptyCart={emptyCart}/>}/>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
