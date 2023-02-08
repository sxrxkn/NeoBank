import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "../pages/Home";
import { BrowserRouter } from "react-router-dom";

describe("Home", () => {
  it("render navigarion bar", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const navBar = screen.getAllByRole("navigation");
    navBar.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it("All images have alt text", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const images = screen.getAllByRole("img");
    images.forEach((element) => {
      expect(element).toHaveAttribute("alt");
    });
  });
});

it("Home is a start page", async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(global.window.location.pathname).toContain("/");
});

it("Change url when click on the button", async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const user = userEvent.setup();
  await user.click(screen.getByText("Choose the card"));
  expect(global.window.location.pathname).toContain("/loan");
});
