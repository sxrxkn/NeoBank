import React from "react";

import valid from "../assets/imgs/valid.svg";
import invalid from "../assets/imgs/invalid.svg";

import { CardLoanOfferProps } from "../models";

import { getStatus, postApply } from "../utils/api";
import { trackPromise } from "react-promise-tracker";
import { useAppDispatch } from "../store/store";
import { updateStatus } from "../store/reducers/LoanOffersReducer";

import "../styles/CardLoanOffer.css";
import "../styles/Button.css";

function CardLoanOffer({
  id,
  payment,
  requestedAmount,
  rate,
  isInsuranceEnabled,
  isSalaryClient,
  term,
  totalAmount,
}: CardLoanOfferProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="offer-card">
      <img
        className="offer-card__img"
        src={require("../assets/imgs/SurpriseImage.png")}
        alt="Surprise box"
      />
      <ul>
        <li className="offer-card__list-item">
          Requested amount: {requestedAmount} ₽
        </li>
        <li className="offer-card__list-item">Total amount: {totalAmount} ₽</li>
        <li className="offer-card__list-item">For {term} months</li>
        <li className="offer-card__list-item">Monthly payment: {payment}</li>
        <li className="offer-card__list-item">Your rate: {rate}</li>
        <li
          className="offer-card__list-item"
          style={{
            background: `url(${
              isInsuranceEnabled ? valid : invalid
            }) no-repeat 100% 0`,
          }}
        >
          Insurance included
        </li>
        <li
          className="offer-card__list-item"
          style={{
            background: `url(${
              isSalaryClient ? valid : invalid
            }) no-repeat 100% 0`,
          }}
        >
          Salary client
        </li>
      </ul>
      <button
        onClick={() => {
          trackPromise(
            postApply(
              id,
              payment,
              requestedAmount,
              rate,
              isInsuranceEnabled,
              isSalaryClient,
              term,
              totalAmount
            )
          ).then(() => {
            getStatus(id).then((data) => {
              dispatch(updateStatus(data.data.status));
            });
          });
        }}
        className="button"
      >
        Selected
      </button>
    </div>
  );
}

export default CardLoanOffer;
