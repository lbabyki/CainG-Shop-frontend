import React from "react";

export function CheckBar({ title, item, checked, onChange }) {
  return (
    <div
      className={`filter-item ${checked ? "checked" : ""}`}
      onClick={() => onChange(item)}
    >
      <label>{item}</label>
      <input
        type={title === "sortby" ? "radio" : "checkbox"}
        checked={checked}
        readOnly
      />
    </div>
  );
}
