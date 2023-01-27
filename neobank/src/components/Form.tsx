import React from "react";

import { Formik, Form, Field } from "formik";
import "../styles/Form.css";

function FormContent() {
  const validateEmail = (value: string) => {
    if (!value) {
      return "Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        value
      )
    ) {
      return "Email invalid adress";
    }
  };

  const validateAmount = (value: number) => {
    if (!value) {
      return "Required field";
    } else if (value < 15000 || value > 600000) {
      return "The amount should be from 15000 to 600000";
    }
  };

  const validateRequiredFields = (value: string) => {
    if (!value) {
      return "Required field";
    }
  };

  const validatePasportSeries = (value: number) => {
    if (!value) {
      return "Required field";
    } else if (String(value).length !== 4) {
      return "The series must be 4 digits";
    }
  };

  const validatePasportNumber = (value: number) => {
    if (!value) {
      return "Required field";
    } else if (String(value).length !== 6) {
      return "The number must be 6 digits";
    }
  };

  const validateBirthdate = (value: Date) => {
    if (!value) {
      return "Required field";
    }
    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      return "User must be over 18 years old";
    }

    const parts = String(value).split("-");
    const day = parseInt(parts[2]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[0]);

    if (year < 1950 || year > 2023 || month === 0 || month > 12)
      return "Enter the correct date";

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
      monthLength[1] = 29;

    if (!(day > 0 && day <= monthLength[month - 1]))
      return "Enter the correct date";
  };

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
      onSubmit={(values) => {
        console.log("submit", values);
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
