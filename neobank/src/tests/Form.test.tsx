import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormContent from "../components/Form";
import { renderWithProviders } from "../utils/functions";

describe("Form", () => {
  it("All inputs must have id", () => {
    renderWithProviders(<FormContent />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((element) => {
      expect(element).toHaveAttribute("id");
    });
  });

  it("Email input must be correct pasted", async () => {
    renderWithProviders(<FormContent />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("test@gmail.com"), "mail");
    expect(screen.getByPlaceholderText("test@gmail.com")).toBeInvalid();
  });

  it("Amount input must be correct pasted", async () => {
    renderWithProviders(<FormContent />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Amount"), "10000");
    expect(screen.getByPlaceholderText("Amount")).toBeInvalid();
  });
});
