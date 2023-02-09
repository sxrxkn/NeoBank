import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "./Button";

import { HeaderProps } from "../models";

import "../styles/Header.css";

function Header({ location }: HeaderProps) {
  const [isActive, setActive] = useState<boolean>();
  const body = document.body;

  const hambHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setActive(!isActive);
    body.classList.toggle("noscroll");
  };

  const closeOnClick = () => {
    setActive(false);
    body.classList.remove("noscroll");
  };

  return (
    <header className="header">
      <div className="header__name">
        <p>NeoBank</p>
      </div>
      <nav className="navigation">
        <ul className="navigation__list">
          <li
            className={`${
              location === "/loan" ? "navigation_active-link" : ""
            }`}
          >
            <Link to="/loan">Credit card</Link>
          </li>
          <li>
            <Link to={"#"}>Product</Link>
          </li>
          <li>
            <Link to={"#"}>Account</Link>
          </li>
          <li>
            <Link to={"#"}>Resources</Link>
          </li>
        </ul>
      </nav>
      <Button to="#" content="Online Bank" buttonClass="header__button" />
      <div className="burger-menu">
        <div
          className={`burger-menu__field ${isActive ? "active" : ""}`}
          onClick={hambHandler}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
      <div className={`popup ${isActive ? "open" : ""}`}>
        <ul className="navigation__list">
          <li
            onClick={closeOnClick}
            className={`${
              location === "/loan" ? "navigation_active-link" : ""
            }`}
          >
            <Link to="/loan">Credit card</Link>
          </li>
          <li onClick={closeOnClick}>
            <Link to={"#"}>Product</Link>
          </li>
          <li onClick={closeOnClick}>
            <Link to={"#"}>Account</Link>
          </li>
          <li onClick={closeOnClick}>
            <Link to={"#"}>Resources</Link>
          </li>
          <li onClick={closeOnClick}>
            <Button
              to="#"
              content="Online Bank"
              buttonClass="header__button header__button_mobile-version"
            />
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
