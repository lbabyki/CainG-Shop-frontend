import React from "react";

function Accountdetails() {
  return (
    <div className="account-details">
      <h1>Account details</h1>

      <form>
        <div className="form-group">
          <label htmlFor="firstName">First name*</label>
          <input type="text" id="firstName" name="firstName" />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last name*</label>
          <input type="text" id="lastName" name="lastName" />
        </div>

        <div className="form-group">
          <label htmlFor="displayName">Display name*</label>
          <input type="text" id="displayName" name="displayName" />
          <small>
            This will be how your name will be displayed in the account section
            and in reviews.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address*</label>
          <input type="email" id="email" name="email" />
        </div>

        <h4>Password change</h4>

        <div className="form-group">
          <label htmlFor="currentPassword">
            Current password (leave blank to leave unchanged)
          </label>
          <input type="password" id="currentPassword" name="currentPassword" />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">
            New password (leave blank to leave unchanged)
          </label>
          <input type="password" id="newPassword" name="newPassword" />
        </div>

        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm new password</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
          />
        </div>

        <button type="submit">SAVE CHANGES</button>
      </form>
    </div>
  );
}
export default Accountdetails;
