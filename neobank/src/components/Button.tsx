import React from "react";
import { Link } from "react-router-dom";

import { ButtonProps } from "../models";

import "../styles/Button.css";

function Button({ content, buttonClass, to }: ButtonProps) {
  return (
    <div className={"button " + buttonClass}>
      <Link className="link" to={to}>
        {content}
      </Link>
    </div>
  );
}

export default Button;
