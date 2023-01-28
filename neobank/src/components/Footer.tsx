import React from "react";

import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__flex-block">
          <img
            className="footer__logo"
            src={require("../assets/imgs/logo.png")}
            alt="Company logo"
          />
          <div>
            <p className="footer__phone-number">+7 (495) 984 25 13</p>
            <p className="footer__mail">info@neoflex.ru</p>
          </div>
        </div>
        <ul className="footer__list">
          <li>About bank</li>
          <li>Ask a Question</li>
          <li>Quality of service</li>
          <li>Requisites</li>
          <li>Press center</li>
          <li>Bank career</li>
          <li>Investors</li>
          <li>Analytics</li>
          <li>Business and processes</li>
          <li>Compliance and business ethics</li>
        </ul>
        <hr />
        <p className="footer__cookies-info">
          We use cookies to personalize our services and improve the user
          experience of our website. Cookies are small files containing
          information about previous visits to a website. If you do not want to
          use cookies, please change your browser settings
        </p>
      </div>
    </footer>
  );
}

export default Footer;
