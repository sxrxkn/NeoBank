import { render } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { ExtendedRenderOptions } from "../models";
import { setupStore } from "../store/store";

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = { updateInformation: { offers: null, status: null } },
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
