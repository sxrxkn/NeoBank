import React from "react";
import { Link } from "react-router-dom";
import "../styles/Button.css";

interface ButtonProps {
  buttonClass: string;
  to: string;
  content: string;
}

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
