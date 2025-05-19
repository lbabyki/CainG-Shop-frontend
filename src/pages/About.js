import React from "react";
import "../assets/css/about.css";
import blogimg from "../assets/img/blog/Img01.png";

function About() {
  return (
    <div className="about-container">
      <h1>About</h1>
      <p className="subtitle">Who we are and why we do what we do!</p>
      <p className="description">
        Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam,
        sollicitudin ante a, gravida arcu. Nam fringilla molestie velit, eget
        pellentesque risus scelerisque a. Nam ac urna maximus, tempor magna ac,
        placerat urna. Curabitur eu magna enim. Proin placerat tortor lacus, ac
        sodales lectus placerat quis.
      </p>

      <div className="section">
        <h3>Top trends</h3>
        <img src={blogimg} alt="Top trends" className="section-image" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
          maximus elit ex vitae libero. Sed quis mauris eget eros facilisis
          consequat sed eu felis.
        </p>
        <ul>
          <li>Consectetur adipiscing elit. Aliquam placerat</li>
          <li>Lorem ipsum dolor sit amet consectetur</li>
        </ul>
      </div>

      <div className="section">
        <h3>Produced with care</h3>
        <img src={blogimg} alt="Produced with care" className="section-image" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
          maximus elit ex vitae libero. Sed quis mauris eget eros facilisis
          consequat sed eu felis. Nulla sed porta augue. Morbi porta tempor
          odio, in molestie diam blandit.
        </p>
      </div>
    </div>
  );
}
export default About;
