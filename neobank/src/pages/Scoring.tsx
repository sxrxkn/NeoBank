import React, { useEffect, useState } from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { trackPromise } from "react-promise-tracker";
import { useParams } from "react-router-dom";

import {
  validateRequiredFields,
  validatePasportNumber,
  validateEmployerINN,
  validateDate,
} from "../utils/validate";

import Footer from "../components/Footer";
import Header from "../components/Header";
import StepSuccesfulFinished from "../components/StepSuccesfulFinished";

import "../styles/Scoring.css";
import "../styles/Form.css";
import { getStatus } from "../utils/api";
import { updateStatus } from "../store/reducers/LoanOffersReducer";
import { useAppDispatch } from "../store/store";

function Scoring() {
  const [isPosted, setPosted] = useState(false);

  const { applicationId } = useParams();

  const isPostedPrescoring = JSON.parse(
    localStorage.getItem("isPostedPrescoring") || "{}"
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const localStoragePostedInfo = localStorage.getItem("isPosted");
    if (localStoragePostedInfo) setPosted(true);
  }, []);

  useEffect(() => {
    if (
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
            heading={"Wait for a decision on the application"}
            text={"The answer will come to your mail within 10 minutes"}
          />
        )) || (
          <section className="form-container">
            <Formik
              initialValues={{
                gender: "",
                maritalStatus: "",
                dependentAmount: "",
                passportIssueDate: "",
                passportIssueBranch: "",
                employmentStatus: "",
                employerINN: "",
                salary: "",
                position: "",
                workExperienceTotal: "",
                workExperienceCurrent: "",
              }}
              onSubmit={({
                gender,
                maritalStatus,
                dependentAmount,
                passportIssueDate,
                passportIssueBranch,
                employmentStatus,
                employerINN,
                salary,
                position,
                workExperienceTotal,
                workExperienceCurrent,
              }) => {
                const config = {
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods":
                      "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                  },
                };
                trackPromise(
                  axios
                    .put(
                      `http://localhost:8080/application/registration/${applicationId}`,
                      {
                        gender: gender,
                        maritalStatus: maritalStatus,
                        dependentAmount: dependentAmount,
                        passportIssueDate: passportIssueDate,
                        passportIssueBranch: passportIssueBranch,
                        employment: {
                          employmentStatus: employmentStatus,
                          employerINN: employerINN,
                          salary: salary,
                          position: position,
                          workExperienceTotal: workExperienceTotal,
                          workExperienceCurrent: workExperienceCurrent,
                        },
                        account: "11223344556677889900",
                      },
                      config
                    )
                    .then(() => {
                      localStorage.setItem("isPosted", "true");
                      setPosted(true);
                      getStatus(+applicationId!).then((data) => {
                        dispatch(updateStatus(data.data.status));
                        console.log(data.data.status);
                      });
                    })
                );
              }}
            >
              {({ errors, touched }) => (
                <Form className="form">
                  <h2 className="form__heading">
                    Continuation of the application
                  </h2>

                  <div className="form__flex-container">
                    <div className="form__scoring-input">
                      <label className="form__label" htmlFor="gender">
                        What's your gender <sup className="required">*</sup>
                      </label>
                      <Field
                        as="select"
                        className={`form__field form__field_update-width  ${
                          errors.gender && touched.gender
                            ? "form__invalid-field"
                            : touched.gender
                            ? "form__valid-field"
                            : ""
                        }`}
                        type="text"
                        name="gender"
                        validate={validateRequiredFields}
                        list="terms"
                        id="gender"
                      >
                        <option style={{ display: "none" }}></option>
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                      </Field>
                      {errors.gender && touched.gender && (
                        <p className="form__tip">{errors.gender}</p>
                      )}
                    </div>

                    <div className="form__scoring-input">
                      <label className="form__label" htmlFor="maritalStatus">
                        Your marital status <sup className="required">*</sup>
                      </label>
                      <Field
                        as="select"
                        className={`form__field form__field_update-width  ${
                          errors.maritalStatus && touched.maritalStatus
                            ? "form__invalid-field"
                            : touched.maritalStatus
                            ? "form__valid-field"
                            : ""
                        }`}
                        type="text"
                        name="maritalStatus"
                        list="terms"
                        id="maritalStatus"
                        validate={validateRequiredFields}
                      >
                        <option style={{ display: "none" }}></option>
                        <option value="MARRIED">MARRIED</option>
                        <option value="DIVORCED">DIVORCED</option>
                        <option value="SINGLE">SINGLE</option>
                        <option value="WIDOW_WIDOWER">WIDOW_WIDOWER</option>
                      </Field>
                      {errors.maritalStatus && touched.maritalStatus && (
                        <p className="form__tip">{errors.maritalStatus}</p>
                      )}
                    </div>

                    <div className="form__scoring-input">
                      <label className="form__label" htmlFor="dependentAmount">
                        Your number of dependents{" "}
                        <sup className="required">*</sup>
                      </label>
                      <Field
                        as="select"
                        className={`form__field form__field_update-width ${
                          errors.dependentAmount && touched.dependentAmount
                            ? "form__invalid-field"
                            : touched.dependentAmount
                            ? "form__valid-field"
                            : ""
                        }`}
                        type="text"
                        name="dependentAmount"
                        list="terms"
                        id="dependentAmount"
                        validate={validateRequiredFields}
                      >
                        <option style={{ display: "none" }}></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </Field>
                      {errors.dependentAmount && touched.dependentAmount && (
                        <p className="form__tip">{errors.dependentAmount}</p>
                      )}
                    </div>

                    <div className="form__scoring-input">
                      <label
                        className="form__label"
                        htmlFor="passportIssueDate"
                      >
                        Date of issue of the passport{" "}
                        <sup className="required">*</sup>
                      </label>
                      <Field
                        className={`form__field form__field_maximum-width ${
                          errors.passportIssueDate && touched.passportIssueDate
                            ? "form__invalid-field"
                            : touched.passportIssueDate
                            ? "form__valid-field"
                            : ""
                        }`}
                        type="date"
                        validate={validateDate}
                        name="passportIssueDate"
                        id="passportIssueDate"
                        placeholder="Select Date and Time"
                      ></Field>
                      {errors.passportIssueDate &&
                        touched.passportIssueDate && (
                          <p className="form__tip">
                            {errors.passportIssueDate}
                          </p>
                        )}
                    </div>

                    <div className="form__scoring-input">
                      <label
                        className="form__label"
                        htmlFor="passportIssueBranch"
                      >
                        Division code <sup className="required">*</sup>
                      </label>
                      <Field
                        className={`form__field form__field_maximum-width ${
                          errors.passportIssueBranch &&
                          touched.passportIssueBranch
                            ? "form__invalid-field"
                            : touched.passportIssueBranch
                            ? "form__valid-field"
                            : ""
                        }`}
                        type="number"
                        name="passportIssueBranch"
                        validate={validatePasportNumber}
                        id="passportIssueBranch"
                        placeholder="000000"
                      ></Field>
                      {errors.passportIssueBranch &&
                        touched.passportIssueBranch && (
                          <p className="form__tip">
                            {errors.passportIssueBranch}
                          </p>
                        )}
                    </div>
                  </div>

                  <h3 className="form__extra-heading">Employment</h3>

                  <div className="form__flex-container">
                    <div className="form__scoring-input">
                      <label className="form__label" htmlFor="employmentStatus">
                        Your employment status <sup className="required">*</sup>
                      </label>
                      <Field
                        as="select"
                        className={`form__field form__field_update-width ${
                          errors.employmentStatus && touched.employmentStatus
                            ? "form__invalid-field"
                            : touched.employmentStatus
                            ? "form__valid-field"
                            : ""
                        }`}
                        type="text"
                        name="employmentStatus"
                        list="terms"
                        id="employmentStatus"
                        validate={validateRequiredFields}
                      >
                        <option style={{ display: "none" }}></option>
                        <option value="UNEMPLOYED">UNEMPLOYED</option>
                        <option value="SELF_EMPLOYED">SELF_EMPLOYED</option>
                        <option value="EMPLOYED">EMPLOYED</option>
                        <option value="BUSINESS_OWNER">BUSINESS OWNER</option>
                      </Field>
                      {errors.employmentStatus && touched.employmentStatus && (
                        <p className="form__tip">{errors.employmentStatus}</p>
                      )}
                    </div>

                    <div className="form__scoring-input">
                      <label className="form__label" htmlFor="employerINN">
                        Your employer INN <sup className="required">*</sup>
                      </label>
                      <Field
                        className={`form__field form__field_update-width ${
                          errors.employerINN && touched.employerINN
                            ? "form__invalid-field"
                            : touched.employerINN
                            ? "form__valid-field"
                            : ""
                        }`}
                        type="number"
                        name="employerINN"
                        id="employerINN"
                        placeholder="000000000000"
                        validate={validateEmployerINN}
                      ></Field>
                      {errors.employerINN && touched.employerINN && (
                        <p className="form__tip">{errors.employerINN}</p>
                      )}
                    </div>

                    <div className="form__scoring-input">
                      <label className="form__label" htmlFor="salary">
                        Your salary <sup className="required">*</sup>
                      </label>
                      <Field
                        className={`form__field form__field_update-width ${
                          errors.salary && touched.salary
                            ? "form__invalid-field"
                            : touched.salary
                            ? "form__valid-field"
                            : ""
                        }`}
                        type="number"
                        name="salary"
                        id="salary"
                        placeholder="For example 100 000"
                        validate={validateRequiredFields}
                      ></Field>
                      {errors.salary && touched.salary && (
                        <p className="form__tip">{errors.salary}</p>
                      )}
                    </div>

                    <div className="form__scoring-input">
                      <label className="form__label" htmlFor="position">
                        Your position <sup className="required">*</sup>
                      </label>
                      <Field
                        as="select"
                        className={`form__field form__field_update-width ${
                          errors.position && touched.position
                            ? "form__invalid-field"
                            : touched.position
                            ? "form__valid-field"
                            : ""
                        }`}
                        type="text"
                        name="position"
                        list="terms"
                        id="position"
                        validate={validateRequiredFields}
                      >
                        <option style={{ display: "none" }}></option>
                        <option value="OWNER">OWNER</option>
                        <option value="TOP_MANAGER">TOP_MANAGER</option>
                        <option value="MID_MANAGER">MID_MANAGER</option>
                        <option value="WORKER">WORKER</option>
                      </Field>

                      {errors.position && touched.position && (
                        <p className="form__tip">{errors.position}</p>
                      )}
                    </div>

                    <div className="form__scoring-input">
                      <label
                        className="form__label"
                        htmlFor="workExperienceTotal"
                      >
                        Your work experience total{" "}
                        <sup className="required">*</sup>
                      </label>
                      <Field
                        className={`form__field form__field_update-width ${
                          errors.workExperienceTotal &&
                          touched.workExperienceTotal
                            ? "form__invalid-field"
                            : touched.workExperienceTotal
                            ? "form__valid-field"
                            : ""
                        }`}
                        type="number"
                        name="workExperienceTotal"
                        id="workExperienceTotal"
                        placeholder="For example 10"
                        maxLength="2"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.value.length > e.target.maxLength) {
                            e.target.value = e.target.value.slice(
                              0,
                              e.target.maxLength
                            );
                          }
                        }}
                        validate={validateRequiredFields}
                      ></Field>
                      {errors.workExperienceTotal &&
                        touched.workExperienceTotal && (
                          <p className="form__tip">
                            {errors.workExperienceTotal}
                          </p>
                        )}
                    </div>

                    <div className="form__scoring-input">
                      <label
                        className="form__label"
                        htmlFor="workExperienceCurrent"
                      >
                        Your work experience current
                        <sup className="required">*</sup>
                      </label>
                      <Field
                        className={`form__field form__field_update-width ${
                          errors.workExperienceCurrent &&
                          touched.workExperienceCurrent
                            ? "form__invalid-field"
                            : touched.workExperienceCurrent
                            ? "form__valid-field"
                            : ""
                        }`}
                        type="number"
                        name="workExperienceCurrent"
                        id="workExperienceCurrent"
                        placeholder="For example 2"
                        maxLength="2"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.value.length > e.target.maxLength) {
                            e.target.value = e.target.value.slice(
                              0,
                              e.target.maxLength
                            );
                          }
                        }}
                        validate={validateRequiredFields}
                      ></Field>
                      {errors.workExperienceCurrent &&
                        touched.workExperienceCurrent && (
                          <p className="form__tip">
                            {errors.workExperienceCurrent}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="form__submit-button">
                    <button className="button" type="submit">
                      Continue
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </section>
        )}
      </main>
      <Footer></Footer>
    </>
  );
}

export default Scoring;
