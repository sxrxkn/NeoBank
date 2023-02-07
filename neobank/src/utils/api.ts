import axios from "axios";
import { ApiError } from "../models";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
  },
};

export const getNewsData = async (url: string) => {
  const newsData = await fetch(url).then((response) => response.json());
  return newsData;
};

export const isApiError = (x: unknown): x is ApiError => {
  if (x && typeof x === "object" && "code" in x) {
    return true;
  }
  return false;
};

export const getStatus = async (id: number) => {
  return await axios.get(
    `http://localhost:8080/admin/application/${id}`,
    config
  );
};

export const getOffersLoanData = async (
  id: number,
  term: number,
  amount: number
) => {
  const response = await getStatus(id);
  const clientInfo = response.data.client;
  return axios.post(
    "http://localhost:8080/application",
    {
      amount: +amount,
      term: +term,
      firstName: clientInfo.firstName,
      lastName: clientInfo.lastName,
      middleName: clientInfo.middleName,
      email: clientInfo.email,
      birthdate: clientInfo.birthdate,
      passportSeries: clientInfo.passportSeries,
      passportNumber: clientInfo.passportNumber,
    },
    config
  );
};

export const postApply = async (
  id: number,
  payment: number,
  requestedAmount: number,
  rate: number,
  isInsuranceEnabled: boolean,
  isSalaryClient: boolean,
  term: number,
  totalAmount: number
) => {
  await axios.post(
    "http://localhost:8080/application/apply",
    {
      applicationId: id,
      requestedAmount: requestedAmount,
      totalAmount: totalAmount,
      monthlyPayment: payment,
      term: term,
      rate: rate,
      isInsuranceEnabled: isInsuranceEnabled,
      isSalaryClient: isSalaryClient,
    },
    config
  );
  localStorage.setItem("isLoanApply", "true");
};

export const postTableApply = async (id: string | undefined) => {
  await axios.post(`http://localhost:8080/document/${id}`, config).then(() => {
    localStorage.setItem("isApplyTable", "true");
  });
};

export const postDocumentApply = async (id: string | undefined) => {
  await axios
    .post(`http://localhost:8080/document/${id}/sign`, config)
    .then(() => {
      localStorage.setItem("isSigned", "true");
    });
};

export const postPinCode = async (
  id: string | undefined,
  numbers: string[]
) => {
  const pin = numbers.join("");
  await axios
    .post(`http://localhost:8080/document/${id}/sign/code`, pin, config)
    .then(() => {
      localStorage.setItem("isCodeCorrect", "true");
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
      }
    });
};

export const postDeny = async (id: string | undefined) => {
  await axios.post(`http://localhost:8080/application/${id}/deny`, config);
};
