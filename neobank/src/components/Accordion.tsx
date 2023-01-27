import React from "react";
import { AccordionProps } from "../models";

import "../styles/Accordion.css";
import "../styles/transition.css";

const Accordion = ({ title, children, isOpened }: AccordionProps) => {
  return (
    <div className="accordion__item">
      <div className="accordion__title">
        <div>{title}</div>
        <div className="accordion__icon"></div>
      </div>
      {children}
    </div>
  );
};

export default Accordion;
