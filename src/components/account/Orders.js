import React from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../../context/orderContext";

function Orders() {
  const { orderItems } = useOrder();

  return (
    <>
      {orderItems.length < 1 ? (
        <div className="empty-order">
          <div className="order-content">
            <p>No order has been made yet.</p>
            <Link to="/shop" className="browe-product">
              BROWSE PRODUCT
            </Link>
          </div>
        </div>
      ) : (
        <div className="order-container">
          <table className="order-table">
            <colgroup>
              <col style={{ width: "30%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "25%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>ORDER NUMBER</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>TOTAL</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((order, index) => {
                const orderId = order._id || order.id;
                const orderDate = new Date(
                  order.createdAt
                ).toLocaleDateString();

                return (
                  <tr key={orderId}>
                    <td>{orderId}</td>
                    <td>{orderDate}</td>
                    <td>{order.status || "Processing"}</td>
                    <td>${order.total?.toFixed(2)}</td>
                    <td>
                      <Link
                        className="linkto-vieworder"
                        to={`/account/orders/${orderId}`}
                      >
                        View Order
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Orders;
