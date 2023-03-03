import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Loan from "../pages/Loan";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../utils/functions";

describe("Loan", () => {
  it("check Accordion work", async () => {
    renderWithProviders(
      <BrowserRouter>
        <Loan />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("Rates and conditions"));
    expect(
      await screen.findByText("Rubles, dollars, euro")
    ).toBeInTheDocument();
  });

  it("check FAQ bar", async () => {
    renderWithProviders(
      <BrowserRouter>
        <Loan />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("FAQ"));
    expect(await screen.findByText("How to get a card?")).toBeInTheDocument();
    await user.click(screen.getByText("How to get a card?"));
    expect(
      await screen.findByText(
        "We will deliver your card by courier free of charge. Delivery in Moscow and St. Petersburg - 1-2 working days. For other regions of the Russian Federation - 2-5 working days."
      )
    ).toBeInTheDocument();
  });

  it("All images have alt text", async () => {
    renderWithProviders(
      <BrowserRouter>
        <Loan />
      </BrowserRouter>
    );
    const images = screen.getAllByRole("img");
    images.forEach((element) => {
      expect(element).toHaveAttribute("alt");
    });
  });
});
