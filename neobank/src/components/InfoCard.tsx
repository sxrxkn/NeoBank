import React from "react";
import { InfoCardProps } from "../models";

import "../styles/InfoCard.css";

function InfoCard({ styles, children }: InfoCardProps) {
  return (
    <div className="info-card" style={styles}>
      {children}
    </div>
  );
}
export default InfoCard;
