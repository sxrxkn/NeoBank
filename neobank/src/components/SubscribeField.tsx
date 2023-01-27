import axios from "axios";
import React, { useEffect, useState } from "react";

import "../styles/Home.css";

function SubscribeField() {
  const [isSubscribe, setSubscribe] = useState(false);
  const [inputValue, setInputValue] = useState<string | null>(null);
  useEffect(() => {});
  const postEmail = () => {
    const data = JSON.stringify({
      email: inputValue,
    });
    axios.post("http://localhost:8080/email", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // fetch("http://localhost:8080/email", {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: {
    //     email: "ivanov@mail.com",
    //   },
    // });
  };

  return (
    <>
      {(isSubscribe && (
        <p className="newsletter-subscribe__text">
          You are already subscribed to the bank's newsletter
        </p>
      )) || (
        <form
          action="http://localhost:8080/email"
          method="post"
          className="subscribe-form"
        >
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
        </form>
      )}
    </>
  );
}

export default SubscribeField;
