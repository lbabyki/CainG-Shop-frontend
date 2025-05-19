import React from "react";
import { useUser } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const { logout, user } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const fullname =
    user?.firstName || "*Không danh phận" + " " + (user?.lastName || " ");

  return (
    <div className="dashboard">
      <p className="title">
        Hello {fullname} (not {fullname}?{" "}
        <span className="linkto" onClick={() => handleLogout()}>
          Log out
        </span>
        )
      </p>

      <p className="title">
        From your account dashboard you can view your{" "}
        <Link className="linkto" to="/account/orders">
          recent orders
        </Link>
        , manage your{" "}
        <Link className="linkto" to="/account/addresses">
          shipping and billing addresses
        </Link>
        , and edit your
        <Link className="linkto" to="/account/accountdetails">
          {" "}
          password and account details.
        </Link>
      </p>
    </div>
  );
}
export default Dashboard;
