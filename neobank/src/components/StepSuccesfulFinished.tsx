import React from "react";

import { StepSuccesfulFinishedProps } from "../models";

import "../styles/StepSuccesfulFinished.css";

function StepSuccesfulFinished({ heading, text }: StepSuccesfulFinishedProps) {
  return (
    <div className="message">
      <h2 className="message__heading">{heading}</h2>
      <p className="message__text">{text}</p>
    </div>
  );
}

export default StepSuccesfulFinished;
