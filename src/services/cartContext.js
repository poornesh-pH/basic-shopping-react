import React, { useContext, useEffect, useReducer } from "react";
import cartReducer from './cartReducer';
const CartContext = React.createContext(null);

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? []; //? if left block is null, execute the second block (i.e) returns [] here
} catch {
  console.log("the cart could not be parsed as JSON");
  initialCart = [];
}

export function CartProvider(props) {
  //* const [state, dispatch] = useReducer(reducer,initialArg,init);
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]); //? dependent on cart array, whenever the cart changes the useEffect will be executed

  const contextValue = {
    cart,
    dispatch,
  };
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  //? custom hook for to context consumer
  const context = useContext(CartContext);
  if(!context){
      throw new Error (
        "useCart must be used within a CartProvider. Wrap a parent component inside <CartProvider> to fix this error")
  }
  return context;
}
