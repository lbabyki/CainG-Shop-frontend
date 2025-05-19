import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";

function Addresses() {
  const { user } = useUser();

  return (
    <div className="address-container">
      <div className="sub-box">
        <p>
          The following addresses will be used on the checkout page by default.
        </p>
      </div>
      <div className="address-main-box">
        <Detail title="Billing address" user={user} />
        <Detail title="Shipping address" user={user} />
      </div>
    </div>
  );
}

function Detail({ title, user }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    postcode: "",
    townCity: "",
    phone: "",
    email: "",
  });

  // ✅ Khi component được render, lấy dữ liệu từ localStorage hoặc user
  useEffect(() => {
    if (user) {
      if (title === "Billing address") {
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          companyName: user.companyName || "",
          country: user.country || "",
          streetAddress: user.streetAddress || "",
          postcode: user.postcode || "",
          townCity: user.city || "",
          phone: user.phone || "",
          email: user.email || "",
        });
      }
    }
  }, [user, title]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(title, JSON.stringify(formData));
    console.log("Form Submitted:", formData);
    setEditing(false);
  };

  const handleAddClick = () => {
    setEditing(true);
  };

  useEffect(() => {
    const savedData = localStorage.getItem(title);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [title]);

  return (
    <div className="address-block">
      <h3 className="title">{title}</h3>
      <div className="address-detail">
        {editing ? (
          <FormEditingDisplay
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : formData.firstName ? (
          <FormDisplay formData={formData} handleAddClick={handleAddClick} />
        ) : (
          <>
            <button className="address-add" onClick={handleAddClick}>
              ADD
            </button>
            <p>You have not set up this type of address yet.</p>
          </>
        )}
      </div>
    </div>
  );
}
function FormEditingDisplay({ formData, handleChange, handleSubmit }) {
  return (
    <>
      <form onSubmit={handleSubmit} className="address-form">
        <div className="name-fields">
          <input
            name="firstName"
            placeholder="First name *"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last name *"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <input
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
        />

        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">Country *</option>
          <option value="Vietnam">Vietnam</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>

        <input
          name="streetAddress"
          placeholder="Street Address *"
          value={formData.streetAddress}
          onChange={handleChange}
          required
        />
        <input
          name="postcode"
          placeholder="Postcode / ZIP *"
          value={formData.postcode}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="Town / City *"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone *"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email *"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit">SAVE ADDRESS</button>
      </form>
    </>
  );
}

function FormDisplay({ formData, handleAddClick }) {
  return (
    <>
      <div className="address-display">
        <div className="name">
          <h6 className="label">
            <p>First Name: </p> <span>{formData.firstName}</span>
          </h6>
          <h6 className="label">
            <p>Last Name: </p> <span>{formData.lastName}</span>
          </h6>
        </div>
        <h6 className="label">
          <p>Company Name: </p> <span>{formData.companyName}</span>
        </h6>
        <h6 className="label">
          <p>Country: </p> <span>{formData.country}</span>
        </h6>
        <h6 className="label">
          <p>Street Address: </p> <span>{formData.streetAddress}</span>
        </h6>
        <h6 className="label">
          <p>Postcode: </p> <span>{formData.postcode}</span>
        </h6>
        <h6 className="label">
          <p>Town/City: </p> <span>{formData.townCity}</span>
        </h6>
        <h6 className="label">
          <p>Phone: </p> <span>{formData.phone}</span>
        </h6>
        <h6 className="label">
          <p>Email: </p> <span>{formData.email}</span>
        </h6>
        <button className="address-edit" onClick={handleAddClick}>
          Edit Address
        </button>
      </div>
    </>
  );
}

export default Addresses;
