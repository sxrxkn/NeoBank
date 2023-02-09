import React, { useState } from "react";

import { trackPromise } from "react-promise-tracker";
import { Formik, Form, Field } from "formik";
import axios from "axios";

import {
  validateRequiredFields,
  validateEmail,
  validateBirthdate,
  validatePasportSeries,
  validatePasportNumber,
} from "../utils/validate";

import { updateInfo } from "../store/reducers/LoanOffersReducer";
import { useAppDispatch } from "../store/store";

import "../styles/Form.css";

function FormContent() {
  const [amountValue, setAmountValue] = useState("15000");
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{
        amount: "",
        term: "",
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        birthdate: "",
        passportSeries: "",
        passportNumber: "",
      }}
      onSubmit={({
        amount,
        term,
        firstName,
        lastName,
        middleName,
        email,
        birthdate,
        passportNumber,
        passportSeries,
      }) => {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        };
        trackPromise(
          axios
            .post(
              "http://localhost:8080/application",
              {
                amount: +amountValue,
                term: +term || 6,
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                email: email,
                birthdate: birthdate,
                passportSeries: passportSeries.toString(),
                passportNumber: passportNumber.toString(),
              },
              config
            )
            .then((response) => {
              dispatch(updateInfo(response.data));
              localStorage.setItem(
                "isPostedPrescoring",
                JSON.stringify({
                  id: response.data[0].applicationId,
                  term: term || 6,
                  amount: amount,
                })
              );
            })
        );
      }}
    >
      {({ errors, touched }) => (
        <Form className="form">
          <h2 className="form__heading">Customize your card</h2>
          <div className="form__flex-amount-container">
            <div className="form__range-container form__amount">
              <label
                className="form__label form__amount-label"
                htmlFor="amount"
              >
                Select amount
              </label>
              <p className="form__current-amount">
                {amountValue.split(/(?=(?:...)*$)/).join(" ")}
              </p>
              <Field
                className={`form__field form__amount-field ${
                  errors.amount && touched.amount
                    ? "form__invalid-field"
                    : touched.amount
                    ? "form__valid-field"
                    : ""
                }`}
                type="range"
                name="amount"
                min="15000"
                onInput={(e: any) => {
                  setAmountValue(e.target.value);
                }}
                max="600000"
                id="amount"
              ></Field>
              <div className="form__min-max-value">
                <p className="form__amount-value">15 000</p>
                <p className="form__amount-value">600 000</p>
              </div>
            </div>
            <hr className="amount__hr" />
            <div className="amount__value-block">
              <p className="amount__heading">You have chosen the amount</p>
              <p className="amount__value">
                {amountValue.split(/(?=(?:...)*$)/).join(" ")} ₽
              </p>
              <hr className="amount__value-hr" />
            </div>
          </div>

          <h3 className="form__extra-heading">Contact Information</h3>
          <div className="form__flex-container">
            <div>
              <label className="form__label" htmlFor="lastname">
                Your last name <sup className="required">*</sup>
              </label>
              <Field
                className={`form__field  ${
                  errors.lastName && touched.lastName
                    ? "form__invalid-field"
                    : touched.lastName
                    ? "form__valid-field"
                    : ""
                }`}
                type="text"
                name="lastName"
                id="lastname"
                placeholder="For Example Doe"
                validate={validateRequiredFields}
              ></Field>
              {errors.lastName && touched.lastName && (
                <p className="form__tip">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label className="form__label" htmlFor="firstName">
                Your first name <sup className="required">*</sup>
              </label>
              <Field
                className={`form__field  ${
                  errors.firstName && touched.firstName
                    ? "form__invalid-field"
                    : touched.firstName
                    ? "form__valid-field"
                    : ""
                }`}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="For Example Jhon"
                validate={validateRequiredFields}
              ></Field>
              {errors.firstName && touched.firstName && (
                <p className="form__tip">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="form__label" htmlFor="middleName">
                Your patronymic
              </label>
              <Field
                className={`form__field  ${
                  errors.middleName && touched.middleName
                    ? "form__invalid-field"
                    : touched.middleName
                    ? "form__valid-field"
                    : ""
                }`}
                type="text"
                name="middleName"
                id="middleName"
                placeholder="For Example Victorovich"
              ></Field>
            </div>
            <div>
              <label className="form__label" htmlFor="term">
                Select term
              </label>
              <Field
                as="select"
                className="form__field"
                type="text"
                name="term"
                list="terms"
                id="term"
              >
                <option value="6">6 month</option>
                <option value="12">12 month</option>
                <option value="18">18 month</option>
                <option value="24">24 month</option>
              </Field>
            </div>
            <div>
              <label className="form__label" htmlFor="email">
                Your email <sup className="required">*</sup>
              </label>
              <Field
                className={`form__field  ${
                  errors.email && touched.email
                    ? "form__invalid-field"
                    : touched.email
                    ? "form__valid-field"
                    : ""
                }`}
                type="email"
                name="email"
                id="email"
                placeholder="test@gmail.com"
                validate={validateEmail}
              ></Field>
              {errors.email && touched.email && (
                <p className="form__tip">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="form__label" htmlFor="birthdate">
                Your date of birth <sup className="required">*</sup>
              </label>
              <Field
                className={`form__field  ${
                  errors.birthdate && touched.birthdate
                    ? "form__invalid-field"
                    : touched.birthdate
                    ? "form__valid-field"
                    : ""
                }`}
                type="date"
                name="birthdate"
                id="birthdate"
                placeholder="Select Date and Time"
                validate={validateBirthdate}
              ></Field>
              {errors.birthdate && touched.birthdate && (
                <p className="form__tip">{errors.birthdate}</p>
              )}
            </div>
            <div>
              <label className="form__label" htmlFor="passportSeries">
                Your passport series <sup className="required">*</sup>
              </label>
              <Field
                className={`form__field  ${
                  errors.passportSeries && touched.passportSeries
                    ? "form__invalid-field"
                    : touched.passportSeries
                    ? "form__valid-field"
                    : ""
                }`}
                type="number"
                name="passportSeries"
                id="passportSeries"
                placeholder="0000"
                validate={validatePasportSeries}
              ></Field>
              {errors.passportSeries && touched.passportSeries && (
                <p className="form__tip">{errors.passportSeries}</p>
              )}
            </div>
            <div>
              <label className="form__label" htmlFor="passportNumber">
                Your passport number <sup className="required">*</sup>
              </label>
              <Field
                className={`form__field  ${
                  errors.passportNumber && touched.passportNumber
                    ? "form__invalid-field"
                    : touched.passportNumber
                    ? "form__valid-field"
                    : ""
                }`}
                type="number"
                name="passportNumber"
                id="passportNumber"
                placeholder="000000"
                validate={validatePasportNumber}
              ></Field>
              {errors.passportNumber && touched.passportNumber && (
                <p className="form__tip">{errors.passportNumber}</p>
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
  );
}

export default FormContent;
