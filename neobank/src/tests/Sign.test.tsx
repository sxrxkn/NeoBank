import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sign from "../pages/Sign";
import { BrowserRouter } from "react-router-dom";

describe("Sign", () => {
  it("The link should have ref for document", () => {
    render(
      <BrowserRouter>
        <Sign />
      </BrowserRouter>
    );
    expect(screen.getByText("Information on your card")).toHaveAttribute(
      "href"
    );
  });

  it("Should have ability to download document", () => {
    render(
      <BrowserRouter>
        <Sign />
      </BrowserRouter>
    );
    expect(screen.getByText("Information on your card")).toHaveAttribute(
      "download"
    );
  });

  it("The button is disabled if the checkbox is not installed", async () => {
    render(
      <BrowserRouter>
        <Sign />
      </BrowserRouter>
    );
    const user = userEvent.setup();

    expect(screen.getByRole("button")).toBeDisabled();
    await user.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("button")).toBeEnabled();
  });
});
