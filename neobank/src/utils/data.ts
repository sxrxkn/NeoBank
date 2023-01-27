import bag from "../assets/imgs/info-card-icons/Bag_duotone.svg";
import calendar from "../assets/imgs/info-card-icons/Calendar_duotone.svg";
import clock from "../assets/imgs/info-card-icons/Clock_duotone.svg";
import credit from "../assets/imgs/info-card-icons/Credit card_duotone.svg";
import money from "../assets/imgs/info-card-icons/Money_duotone.svg";

export const accordionIssuingData = [
  {
    title: "How to get a card?",
    content: `We will deliver your card by courier free of charge. Delivery in Moscow and St. Petersburg - 1-2 working days. For other regions of the Russian Federation - 2-5 working
    days.`,
  },
  {
    title: "What documents are needed and how old should one be to get a card?",
    content: `Need a passport. You must be between 20 and 70 years old.`,
  },
  {
    title: "In what currency can I issue a card?",
    content: `In rubles, dollars or euro`,
  },
  {
    title: "How much income do I need to get a credit card?",
    content: `To obtain a credit card, you will need an income of at least 25,000 rubles per month after taxes.`,
  },
  {
    title: "How do I find out about the bank's decision on my application?",
    content: `After registration, you will receive an e-mail with a decision on your application.`,
  },
];

export const accordionUsingData = [
  {
    title: "What is an interest free credit card?",
    content: `A credit card with a grace period is a bank card with an established credit limit,
     designed for payment, reservation of goods and services, as well as for receiving cash,
      which allows you to use credit funds free of charge for a certain period.`,
  },
  {
    title: "How to activate a credit card",
    content: `You can activate your credit card and generate a PIN code immediately after receiving
     the card at a bank branch using a PIN pad.`,
  },
  {
    title: "What is a settlement date?",
    content: `The settlement date is the date from which you can pay off the debt for the reporting period.
     The settlement date falls on the first calendar day following the last day of the reporting period.
     The first settlement date is reported by the bank when transferring the issued credit card to the client,
     and then in the monthly account statement.`,
  },
  {
    title: "What do I need to know about interest rates?",
    content: `For each reporting period from the 7th day of the previous month to the 6th day of the current month inclusive,
   a statement is generated for the credit card. The statement contains information on the amount and timing of the minimum payment,
    as well as the total amount of debt as of the date of issue.`,
  },
];

export const aboutCardData = [
  {
    icon: money,
    content: "Up to 50 000 ₽",
    additionalInfo: "Cash and transfers without commission and percent",
  },
  {
    icon: calendar,
    content: "Up to 160 days",
    additionalInfo: "Without percent on the loan",
  },
  {
    icon: clock,
    content: "Free delivery",
    additionalInfo:
      "We will deliver your card by courier at a convenient place and time for you",
  },
  {
    icon: bag,
    content: "Up to 12 months",
    additionalInfo:
      "No percent. For equipment, clothes and other purchases in installments",
  },
  {
    icon: credit,
    content: "Convenient deposit and withdrawal",
    additionalInfo:
      "At any ATM. Top up your credit card for free with cash or transfer from other cards",
  },
];

export const cashbackData = [
  {
    content: "For food delivery, cafes and restaurants",
    cashback: "5%",
  },
  {
    content: "In supermarkets with our subscription",
    cashback: "5%",
  },
  {
    content: "In clothing stores and children's goods",
    cashback: "2%",
  },
  {
    content: "Other purchases and payment of services and fines",
    cashback: "1%",
  },
  {
    content: "Shopping in online stores",
    cashback: "up to 3%",
  },
  {
    content: "Purchases from our partners",
    cashback: "30%",
  },
];

export const defaultCurrenciesArray = [
  { from: "USD", to: "RUB" },
  { from: "EUR", to: "RUB" },
  { from: "SGD", to: "RUB" },
  { from: "MYR", to: "RUB" },
  { from: "AUD", to: "RUB" },
  { from: "JPY", to: "RUB" },
];

export const conditions = [
  { content: "Card currency", annotation: "Rubles, dollars, euro" },
  { content: "Interest free period", annotation: "0% up to 160 days" },
  { content: "Payment system", annotation: "Mastercard, Visa" },
  { content: "Maximum credit limit on the card", annotation: "600 000 ₽" },
  {
    content: "Replenishment and withdrawal",
    annotation:
      "At any ATM. Top up your credit card for free with cash or transfer from other cards",
  },
  { content: "Max cashback per month", annotation: "15 000 ₽" },
  {
    content: "Transaction Alert",
    annotation: `60 ₽ — SMS or push notifications\n0 ₽ — card statement, information about transactions in the online bank`,
  },
];
