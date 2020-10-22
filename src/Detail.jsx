import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
export default function Detail(props) {
  const { id } = useParams();
  const [sku, setSku] = useState(""); 
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(`products/${id}`);


  if (loading) return <Spinner />;
  if (error) return <h1>Item not exists!</h1>;

  // TODO: Display these products details
  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option hidden>What size?</option>
        {product.skus.map((s)=>(
          <option key={s.sku} value={s.sku} >
            {s.size}
          </option>
        ))}
      </select>
      <p>
        <button className="btn btn-primary" disabled={!sku} onClick={() => {
          props.dispatch({type:"addItems",id,sku});
          navigate("/cart");}}>
          Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
