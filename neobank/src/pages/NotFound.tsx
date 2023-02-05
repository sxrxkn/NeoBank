import React from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";

import "../styles/Button.css";
import "../styles/NotFound.css";

function NotFound() {
  const locateBack = () => {
    window.history.back();
  };

  return (
    <>
      <Header></Header>
      <main>
        <section className="not-found-content">
          <div>
            <p className="not-found-content__text">Oops....</p>
            <p className="not-found-content__text">Page not found</p>
            <p className="not-found-content__description">
              This Page doesn`t exist or was removed! We suggest you go back.
            </p>
            <button
              className="button button_width-increase"
              onClick={locateBack}
            >
              Go back
            </button>
          </div>
          <div>
            <img
              className="not-found-content__img"
              src={require("../assets/imgs/404-err.png")}
              alt="Not found page"
            />
          </div>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default NotFound;
