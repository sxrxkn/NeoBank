import React, { useEffect, useRef, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useParams } from "react-router-dom";

import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { updateInfo, updateStatus } from "../store/reducers/LoanOffersReducer";
import { useAppDispatch } from "../store/store";

import { postPinCode } from "../utils/api";

import "../styles/Code.css";

function Code() {
  const [isPosted, setPosted] = useState(false);
  const [isNotCorrect, setNotCorrect] = useState(false);

  const { applicationId } = useParams();
  const dispatch = useAppDispatch();

  const isPostedPrescoring = JSON.parse(
    localStorage.getItem("isPostedPrescoring") || "{}"
  );
  const initDigits = ["", "", "", ""];
  const [digits, setDigits] = useState(initDigits);
  const length = digits.length;

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const localStoragePostedInfo = localStorage.getItem("isCodeCorrect");
    if (localStoragePostedInfo) setPosted(true);
  }, []);

  useEffect(() => {
    if (
      !localStorage.getItem("isSigned") ||
      !isPostedPrescoring.id ||
      applicationId !== isPostedPrescoring.id.toString()
    ) {
      window.location.replace("http://localhost:3000/loan");
    }
  }, [applicationId, isPostedPrescoring.id]);

  const handleChange = (index: number, newValue: string) => {
    const oldDigit = digits[index];
    const newDigit = newValue.trim().replace(oldDigit, "");
    if (newDigit < "0" || newDigit > "9") return;
    const newDigits = [...digits];
    newDigits[index] = newDigit;
    if (newDigits.every((v) => v !== "")) {
      trackPromise(
        postPinCode(applicationId, newDigits).then(() => {
          if (!localStorage.getItem("isCodeCorrect")) {
            setNotCorrect(true);
          } else {
            setPosted(true);
            dispatch(updateStatus(null));
            dispatch(updateInfo(null));
          }
        })
      );
    }

    setDigits(newDigits);
    if (index < length - 1) {
      inputRefs.current[index + 1].focus();
    } else {
      inputRefs.current[index].blur();
    }
  };

  return (
    <>
      <Header></Header>
      <main>
        {(isPosted && (
          <section className="finish-registration">
            <img
              className="finish-registration__img"
              src={require("../assets/imgs/SurpriseImage.png")}
              alt="Surprise box"
            />
            <h2 className="finish-registration__heading">
              Congratulations! You have completed your new credit card.
            </h2>
            <p className="finish-registration__text">
              Your credit card will arrive soon. Thank you for choosing us!
            </p>
            <div
              onClick={() => {
                localStorage.clear();
              }}
            >
              <Button
                buttonClass="finish-registration__button"
                to="/"
                content="View other offers of our bank"
              ></Button>
            </div>
          </section>
        )) || (
          <section className="code">
            <h2 className="code__heading">Please enter confirmation code</h2>
            <div>
              {digits.map((digit: string, index: number) => (
                <input
                  className="code__input"
                  id={(index + 1).toString()}
                  key={index}
                  value={digit}
                  onChange={(event) => {
                    handleChange(index, event.target.value);
                  }}
                  ref={(element) =>
                    (inputRefs.current[index] = element as HTMLInputElement)
                  }
                />
              ))}
            </div>
            {isNotCorrect && (
              <p className="code__invalid">Invalid confirmation code</p>
            )}
          </section>
        )}
      </main>
      <Footer></Footer>
    </>
  );
}

export default Code;
