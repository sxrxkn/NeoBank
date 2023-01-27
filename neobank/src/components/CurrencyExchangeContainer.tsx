import React from "react";
import { CurrencyBlockProps } from "../models";

import "../styles/CurrencyExchangeContainer.css";

function CurrencyBlock({ from, to }: CurrencyBlockProps) {
  return (
    <div className="exchange-rate__list-container">
      <dt>{from + ":"}</dt>
      <dd>{to}</dd>
    </div>
  );
}
export default CurrencyBlock;
