import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Code from "./pages/Code";

import Home from "./pages/Home";
import Loan from "./pages/Loan";
import NotFound from "./pages/NotFound";
import PaymentSchedule from "./pages/PaymentSchedule";
import Scoring from "./pages/Scoring";
import Sign from "./pages/Sign";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/loan",
    element: <Loan />,
  },
  {
    path: "/loan/:applicationId",
    element: <Scoring />,
  },
  {
    path: "/loan/:applicationId/document",
    element: <PaymentSchedule />,
  },
  {
    path: "/loan/:applicationId/document/sign",
    element: <Sign></Sign>,
  },
  {
    path: "/loan/:applicationId/code",
    element: <Code></Code>,
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
