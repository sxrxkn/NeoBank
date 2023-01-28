import React, { useEffect, useState } from "react";

import axios from "axios";
import { trackPromise } from "react-promise-tracker";

import "../styles/Home.css";

function SubscribeField() {
  const [isSubscribe, setSubscribe] = useState(false);
  const [inputValue, setInputValue] = useState<string | null>(null);

  useEffect(() => {
    const localStorageSubscribeInfo = localStorage.getItem("isSubscribe");
    if (localStorageSubscribeInfo) setSubscribe(true);
  }, []);

  const postEmail = () => {
    if (!isSubscribe) {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      };
      trackPromise(
        axios
          .post(
            "http://localhost:8080/email",
            {
              email: inputValue,
            },
            config
          )
          .then(() => {
            localStorage.setItem("isSubscribe", "true");
            setSubscribe(true);
          })
      );
    }
  };

  return (
    <>
      {(isSubscribe && (
        <p className="newsletter-subscribe__text">
          You are already subscribed to the bank's newsletter
        </p>
      )) || (
        <div className="subscribe-form">
          <input
            className="newsletter-subscribe__input"
            type="email"
            name="email"
            placeholder="Your email"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button
            className="newsletter-subscribe__submit-button"
            onClick={postEmail}
          >
            Subscribe
          </button>
        </div>
      )}
    </>
  );
}

export default SubscribeField;
