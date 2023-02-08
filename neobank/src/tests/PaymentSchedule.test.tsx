import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaymentSchedule from "../pages/PaymentSchedule";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../utils/functions";

describe("PaymentSchedule", () => {
  it("The button should be disabled", () => {
    renderWithProviders(
      <BrowserRouter>
        <PaymentSchedule />
      </BrowserRouter>
    );
    expect(screen.getByText("Send")).toBeDisabled();
  });

  it("The table should be render", () => {
    renderWithProviders(
      <BrowserRouter>
        <PaymentSchedule />
      </BrowserRouter>
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("Open/close modal", async () => {
    renderWithProviders(
      <BrowserRouter>
        <PaymentSchedule />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("Deny"));
    expect(
      await screen.findByText(
        "You exactly sure, you want to cancel this application?"
      )
    ).toBeInTheDocument();
    await user.click(screen.getByText("Cancel"));
    expect(
      screen.queryByText(
        "You exactly sure, you want to cancel this application?"
      )
    ).not.toBeInTheDocument();
  });
});
