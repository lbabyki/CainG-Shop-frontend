import React from "react";
import { useOutletContext } from "react-router-dom";

function Description() {
  const { product } = useOutletContext();

  return <p>{product?.description || "No description available."}</p>;
}
export default Description;
