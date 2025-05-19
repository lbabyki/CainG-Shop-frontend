import React from "react";
import "../assets/css/termofservice.css"; // Import file CSS

const PrivacyPolicy = () => {
  return (
    <div className="container">
      <h1 className="title">Privacy Policy</h1>
      <p className="paragraph">
        Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam,
        sollicitudin ante a, gravida arcu. Nam fringilla molestie velit, eget
        pellentesque risus scelerisque. Nam ac maximus, tempor purus a, gravida
        urna. Curabitur eu magna enim. Proin placerat tortor lacus, ac sodales
        lectus placerat quis.
      </p>

      <h2 className="subtitle">Security</h2>
      <p className="paragraph">
        Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam,
        sollicitudin ante a, gravida arcu. Nam fringilla molestie velit, eget
        pellentesque risus scelerisque.
      </p>

      <h2 className="subtitle">Cookies</h2>
      <ul className="paragraph">
        <li>
          Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam,
          sollicitudin ante a, gravida arcu.
        </li>
        <li>
          Nam fringilla molestie velit, eget pellentesque risus scelerisque.
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
