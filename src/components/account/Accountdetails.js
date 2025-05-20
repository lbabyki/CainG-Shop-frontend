import React, { useEffect, useState } from "react";
import { APP_API_URL } from "../../assets/config/API";

function Accountdetails({ user, token }) {
  const [password, setPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        displayName: user.displayName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password !== confirmNewPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }

    const updatedData = { ...formData };
    if (password) {
      updatedData.password = password;
    }

    try {
      const response = await fetch(`${APP_API_URL}/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Nếu cần bảo vệ bằng JWT
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Cập nhật thành công!");
        console.log("Updated:", result);
      } else {
        alert(result.message || "Có lỗi xảy ra khi cập nhật.");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Lỗi kết nối máy chủ.");
    }
  };

  return (
    <div className="account-details">
      <h1>Account details</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First name*</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last name*</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="displayName">Display name*</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
          <small>
            This will be how your name will be displayed in the account section
            and in reviews.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <h4>Password change</h4>

        <div className="form-group">
          <label htmlFor="newPassword">
            New password (leave blank to keep current)
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm new password</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        <button type="submit">SAVE CHANGES</button>
      </form>
    </div>
  );
}

export default Accountdetails;
