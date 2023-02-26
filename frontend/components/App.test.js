// Write your tests here
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppFunctional from "./AppFunctional";

test("Sol Test", async () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByTestId("sol-button"));
  fireEvent.click(screen.getByTestId("sol-button"));
  expect(screen.getByText("Sola Gidemezsiniz!")).toBeInTheDocument();
});

test("Sag test", async () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByTestId("sağ-button"));
  fireEvent.click(screen.getByTestId("sağ-button"));
  expect(screen.getByText("Sağa Gidemezsiniz!")).toBeInTheDocument();
});

test("Yukari test", async () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByTestId("yukari-button"));
  fireEvent.click(screen.getByTestId("yukari-button"));
  expect(screen.getByText("Yukarıya Gidemezsiniz!")).toBeInTheDocument();
});

test("Asagi test", async () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByTestId("aşaği-button"));
  fireEvent.click(screen.getByTestId("aşaği-button"));
  expect(screen.getByText("Aşağıya Gidemezsiniz!")).toBeInTheDocument();
});
test("reset test", async () => {
  render(<AppFunctional />);
  let komutlar = ["yukari", "aşaği", "aşaği", "sol", "sağ", "sağ", "reset"];
  komutlar.forEach((komut) => {
    fireEvent.click(screen.getByTestId(`${komut}-button`));
  });
  expect(screen.getByText("Koordinatlar (2, 2)")).toBeInTheDocument();
  expect(screen.getByText("0 kere ilerlediniz")).toBeInTheDocument();
});
