import React from "react";

import { trackPromise } from "react-promise-tracker";
import { Formik, Form, Field } from "formik";
import axios from "axios";

import {
  validateAmount,
  validateRequiredFields,
  validateEmail,
  validateBirthdate,
  validatePasportSeries,
  validatePasportNumber,
} from "../utils/validate";

import "../styles/Form.css";

function FormContent() {
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
          axios.post(
            "http://localhost:8080/application",
            {
              amount: +amount,
              term: +term,
              firstName: firstName.toString(),
              lastName: lastName.toString(),
              middleName: middleName.toString(),
              email: email.toString(),
              birthdate: birthdate.toString(),
              passportNumber: passportNumber.toString(),
              passportSeries: passportSeries.toString(),
            },
            config
          )
        );
      }}
    >
      {({ errors, touched }) => (
        <Form className="form">
          <h2 className="form__heading">Customize your card</h2>
          <div className="form__range-container form__amount">
            <label className="form__label" htmlFor="amount">
              Select amount <sup className="required">*</sup>
            </label>
            <Field
              className={`form__field  ${
                errors.amount && touched.amount
                  ? "form__invalid-field"
                  : touched.amount
                  ? "form__valid-field"
                  : ""
              }`}
              type="number"
              name="amount"
              min="15000"
              max="600000"
              id="amount"
              validate={validateAmount}
              placeholder="Amount"
            ></Field>
            {errors.amount && touched.amount && (
              <p className="form__tip">{errors.amount}</p>
            )}
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
