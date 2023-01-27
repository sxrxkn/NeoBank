import React from "react";
import { NewsCardProps } from "../models";

import "../styles/InfoCard.css";

function InfoCard({ styles, children }: NewsCardProps) {
  return (
    <div className="info-card" style={styles}>
      {children}
    </div>
  );
}
export default InfoCard;
