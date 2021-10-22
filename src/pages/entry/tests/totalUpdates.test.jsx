import { render, screen } from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderDetailsProvider from "../../../contexts/OrderDetails";

it("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText("Scoops total:", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update the vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update the chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  expect(scoopsSubtotal).toHaveTextContent("6.00");
});