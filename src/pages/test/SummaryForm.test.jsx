import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SumamryForm from "../summary/SummaryFrom";

it("There is a checkbox that is disabled by default", () => {
  render(<SumamryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const button = screen.getByRole("button", { name: "Confirm order" });
  expect(button).toBeDisabled();
  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});
