import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Code from "../pages/Code";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../utils/functions";

describe("Code", () => {
  it("update focus on input", async () => {
    renderWithProviders(
      <BrowserRouter>
        <Code />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const fields = screen.getAllByRole("textbox");
    await user.type(fields[0], "1");
    expect(fields[1]).toHaveFocus();
  });

  it("there is no way to enter letters", async () => {
    renderWithProviders(
      <BrowserRouter>
        <Code />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const fields = screen.getAllByRole("textbox");
    await user.type(fields[0], "d");
    expect(fields[0]).toHaveValue("");
  });

  it("invalid code message", async () => {
    renderWithProviders(
      <BrowserRouter>
        <Code />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const fields = screen.getAllByRole("textbox");
    await user.type(fields[0], "0");
    await user.type(fields[1], "0");
    await user.type(fields[2], "0");
    await user.type(fields[3], "0");
    expect(
      await screen.findByText("Invalid confirmation code")
    ).toBeInTheDocument();
  });
});
