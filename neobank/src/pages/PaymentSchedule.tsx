import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useParams } from "react-router-dom";

import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import StepSuccesfulFinished from "../components/StepSuccesfulFinished";
import Table from "../components/Table";

import { updateInfo, updateStatus } from "../store/reducers/LoanOffersReducer";
import { useAppDispatch } from "../store/store";

import { getStatus, postDeny, postTableApply } from "../utils/api";

import "../styles/PaymentSchedule.css";

function PaymentSchedule() {
  const dispatch = useAppDispatch();
  const [isDeny, setDeny] = useState<boolean>(false);
  const [isShow, setShow] = useState<boolean>(false);
  const [isPostedTable, setPosted] = useState<boolean>(false);
  const [isAgree, setAgree] = useState<boolean>(false);

  const { applicationId } = useParams();

  const isPostedPrescoring = JSON.parse(
    localStorage.getItem("isPostedPrescoring") || "{}"
  );

  useEffect(() => {
    const localStoragePostedInfo = localStorage.getItem("isApplyTable");
    if (localStoragePostedInfo) setPosted(true);
  }, []);

  useEffect(() => {
    if (
      !localStorage.getItem("isPosted") ||
      !isPostedPrescoring.id ||
      applicationId !== isPostedPrescoring.id.toString()
    ) {
      window.location.replace("http://localhost:3000/loan");
    }
  }, [applicationId, isPostedPrescoring.id]);

  return (
    <>
      <Header></Header>
      <main className="form-container">
        {(isPostedTable && (
          <StepSuccesfulFinished
            heading="Documents are formed"
            text="Documents for signing will be sent to your email"
          />
        )) || (
          <section className="form">
            <h2 className="form__heading">Payment Schedule</h2>
            <Table></Table>
            <div className="confirm confirm-container">
              <button
                onClick={() => {
                  setShow(true);
                }}
                className="button confirm__deny"
              >
                Deny
              </button>
              <div className="confirm-container">
                <input
                  name="checkbox"
                  id="checkbox"
                  type="checkbox"
                  onChange={() => {
                    setAgree(!isAgree);
                  }}
                />
                <label className="confrim__label" htmlFor="checkbox">
                  I agree with the payment schedule
                </label>
                <button
                  disabled={!isAgree}
                  onClick={() =>
                    trackPromise(
                      postTableApply(applicationId).then(() => {
                        setPosted(true);
                        getStatus(+applicationId!).then((data) => {
                          dispatch(updateStatus(data.data.status));
                        });
                      })
                    )
                  }
                  className="button"
                >
                  Send
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
      {isShow && (
        <Modal>
          <section className="modal-view">
            <div className="modal-view__container">
              <p className="modal-view__heading">Deny application</p>
              <img
                className="modal-view__img"
                src={require("../assets/imgs/deny.png")}
                alt="Cancel"
                onClick={() => {
                  setShow(false);
                }}
              />
            </div>
            {(isDeny && (
              <>
                <p className="modal-view__text">
                  Your application has been deny!
                </p>
                <div
                  className="modal-view__home-button"
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  <Button buttonClass="" to="/" content="Go home"></Button>
                </div>
              </>
            )) || (
              <>
                <p className="modal-view__text">
                  You exactly sure, you want to cancel this application?
                </p>
                <div className="modal-view__buttons-container">
                  <button
                    onClick={() => {
                      trackPromise(
                        postDeny(isPostedPrescoring.id).then(() => {
                          setDeny(true);
                          dispatch(updateStatus(null));
                          dispatch(updateInfo(null));
                        })
                      );
                    }}
                    className="modal-view__deny button"
                  >
                    Deny
                  </button>
                  <button
                    onClick={() => {
                      setShow(false);
                    }}
                    className="button"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </section>
        </Modal>
      )}
      <Footer></Footer>
    </>
  );
}

export default PaymentSchedule;
