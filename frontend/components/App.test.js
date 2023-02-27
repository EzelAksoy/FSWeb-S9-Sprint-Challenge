// Write your tests here
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppFunctional from "./AppFunctional";

test("Sol Test", async () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByTestId("sol-button"));
  fireEvent.click(screen.getByTestId("sol-button"));
  expect(screen.getByText("Sola gidemezsiniz")).toBeInTheDocument();
});

test("Sag test", async () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByTestId("sağ-button"));
  fireEvent.click(screen.getByTestId("sağ-button"));
  expect(screen.getByText("Sağa gidemezsiniz")).toBeInTheDocument();
});

test("Yukari test", async () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByTestId("yukari-button"));
  fireEvent.click(screen.getByTestId("yukari-button"));
  expect(screen.getByText("Yukarıya gidemezsiniz")).toBeInTheDocument();
});

test("Asagi test", async () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByTestId("aşaği-button"));
  fireEvent.click(screen.getByTestId("aşaği-button"));
  expect(screen.getByText("Aşağıya gidemezsiniz")).toBeInTheDocument();
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
test("Mail test", async () => {
  render(<AppFunctional />);
  const mail = screen.getByTestId("mail-input");
  fireEvent.change(mail, { target: { value: "aksoy.ezel@gmail.com" } });
  expect(mail.value).toBe("aksoy.ezel@gmail.com");
});
test("Step ve Kordinat test", async () => {
  render(<AppFunctional />);
  let komutlar = ["yukari"];
  komutlar.forEach((komut) => {
    fireEvent.click(screen.getByTestId(`${komut}-button`));
  });
  expect(screen.getByText("1 kere ilerlediniz")).toBeInTheDocument();
  expect(screen.getByText("Koordinatlar (3,3)")).toBeInTheDocument();
});
