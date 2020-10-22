import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {

  const activeStyles ={
    color : "purple"
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeStyle={activeStyles}>
            <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </NavLink>
          </li>
          <li>
            <NavLink to="shoes" activeStyle={activeStyles}>Shoes</NavLink>
          </li>
          <li>
            <NavLink to="cart" activeStyle={activeStyles}>Cart</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
