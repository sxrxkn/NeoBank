import { PreloadedState } from "@reduxjs/toolkit";
import { RenderOptions } from "@testing-library/react";
import { AppStore, RootState } from "./store/store";

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export interface AccordionAnswersProps {
  content: React.ReactNode;
}

export interface InfoCardProps {
  styles: React.CSSProperties;
  children: React.ReactNode;
}

export interface NewsData {
  description: string;
  link: string;
  urlToImage: string;
  title: string;
}

export interface CurrencyBlockProps {
  from: string;
  to: string;
}

export interface Currencies {
  from: string;
  roundValue: string;
}

export interface NaviagtionListData {
  func?: () => void;
  children?: React.ReactNode;
}

export interface ApiError {
  code: number;
  error: string;
}

export interface News {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: null;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

export interface ButtonProps {
  buttonClass: string;
  to: string;
  content: string;
}

export interface HeaderProps {
  location?: string;
}

export interface NewsCardProps {
  heading: string;
  imgSrc: string;
  description: string;
  link: string;
}

export interface TabContentProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
}

export interface TabNavProps {
  id: string;
  title: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export interface CardLoanOfferProps {
  id: number;
  payment: number;
  requestedAmount: number;
  rate: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
  term: number;
  totalAmount: number;
}

export interface TableData {
  number: string;
  date: string;
  totalPayment: string;
  interestPayment: string;
  debtPayment: string;
  remainingDebt: string;
}

export interface Offer {
  applicationId: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
  monthlyPayment: number;
  rate: number;
  requestedAmount: number;
  term: number;
  totalAmount: number;
}

export interface StepSuccesfulFinishedProps {
  heading: string;
  text: string;
}

export interface SortConfig {
  direction: string;
  key: string;
}

export interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}
