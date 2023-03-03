import React from "react";
import { screen } from "@testing-library/react";
import Scoring from "../pages/Scoring";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../utils/functions";
import userEvent from "@testing-library/user-event";

describe("Scoring form", () => {
  it("The form should be render", () => {
    renderWithProviders(
      <BrowserRouter>
        <Scoring />
      </BrowserRouter>
    );

    const selects = screen.getAllByRole("combobox");
    selects.forEach((element) => {
      expect(element).toHaveValue("");
    });
  });

  it("All inputs must have id", async () => {
    renderWithProviders(
      <BrowserRouter>
        <Scoring />
      </BrowserRouter>
    );
    const inputs = screen.getAllByRole("spinbutton");
    const selects = screen.getAllByRole("combobox");
    inputs.forEach((element) => {
      expect(element).toHaveAttribute("id");
    });
    selects.forEach((element) => {
      expect(element).toHaveAttribute("id");
    });
  });

  it("input must be correct pasted", async () => {
    renderWithProviders(
      <BrowserRouter>
        <Scoring />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("000000"), "Word");
    expect(screen.getByPlaceholderText("000000")).toHaveValue(null);
  });
});
