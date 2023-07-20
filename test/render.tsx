import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { initReactI18next } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18next from "i18next";
import "@testing-library/jest-dom";

i18next.use(initReactI18next).init({
  lng: "cimode", // the output text will be the key
  debug: false,
  interpolation: { escapeValue: false },
  resources: { en: {}, de: {} },
});

const queryClient = new QueryClient();

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
