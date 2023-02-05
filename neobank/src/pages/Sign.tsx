import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { postDocumentApply } from "../utils/api";
import { trackPromise } from "react-promise-tracker";

import Footer from "../components/Footer";
import Header from "../components/Header";
import StepSuccesfulFinished from "../components/StepSuccesfulFinished";

import fileIcon from "../assets/imgs/pngFile.svg";

import "../styles/Sign.css";

function Sign() {
  const [isAgree, setAgree] = useState(false);
  const [isPosted, setPosted] = useState(false);
  const { applicationId } = useParams();

  useEffect(() => {
    const localStoragePostedInfo = localStorage.getItem("isSigned");
    if (localStoragePostedInfo) setPosted(true);
  }, []);

  const isPostedPrescoring = JSON.parse(
    localStorage.getItem("isPostedPrescoring") || "{}"
  );

  useEffect(() => {
    if (
      !localStorage.getItem("isApplyTable") ||
      !isPostedPrescoring.id ||
      applicationId !== isPostedPrescoring.id.toString()
    ) {
      window.location.replace("http://localhost:3000/loan");
    }
  }, [applicationId, isPostedPrescoring.id]);

  return (
    <>
      <Header></Header>
      <main>
        {(isPosted && (
          <StepSuccesfulFinished
            heading="Documents have been successfully signed and sent for approval"
            text="Within 10 minutes you will be sent a PIN code to your email for confirmation"
          />
        )) || (
          <>
            <section className="sign">
              <div className="sign__flex">
                <h2 className="sign__heading">Signing of documents</h2>
                <p className="sign__step-info">Step 4 of 5</p>
              </div>
              <p className="sign__content">
                Information on interest rates under bank deposit agreements with
                individuals. Center for Corporate Information Disclosure.
                Information of a professional participant in the securities
                market. Information about persons under whose control or
                significant influence the Partner Banks are. By leaving an
                application, you agree to the processing of personal data,
                obtaining information, obtaining access to a credit history,
                using an analogue of a handwritten signature, an offer, a policy
                regarding the processing of personal data, a form of consent to
                the processing of personal data.
              </p>
            </section>
            <div className="sign__container">
              <img className="sign__image" src={fileIcon} alt="File" />
              <a className="sign__file-link" href="/pdfname.pdf" download>
                Information on your card
              </a>
            </div>
            <div className="sign__confirm">
              <div className="sign__checkbox">
                <input
                  name="checkbox"
                  id="checkbox"
                  type="checkbox"
                  onChange={() => {
                    setAgree(!isAgree);
                  }}
                />
                <label htmlFor="checkbox">I agree</label>
              </div>

              <button
                disabled={!isAgree}
                onClick={() => {
                  trackPromise(
                    postDocumentApply(applicationId).then(() => {
                      setPosted(true);
                    })
                  );
                }}
                className="button"
              >
                Send
              </button>
            </div>
          </>
        )}
      </main>
      <Footer></Footer>
    </>
  );
}

export default Sign;
