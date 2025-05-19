import React from "react";
import "../../assets/css/product/addinformation.css";
import { useOutletContext } from "react-router-dom";

function AddInformation() {
  const { product } = useOutletContext();
  const info = product?.additionalInfo || {};

  return (
    <>
      <h3 className="kg-title">
        Weight: <span className="kg">{info.weight || "N/A"}</span>
      </h3>
      <h3 className="kg-title">
        Dimensions: <span className="kg">{info.dimensions || "N/A"}</span>
      </h3>
      <h3 className="kg-title">
        Colours:{" "}
        <span className="kg">
          {info.colours && info.colours.length > 0
            ? info.colours.join(", ")
            : "N/A"}
        </span>
      </h3>
      <h3 className="kg-title">
        Material: <span className="kg">{info.material || "N/A"}</span>
      </h3>
    </>
  );
}

export default AddInformation;
