import App from '../App';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('Order phases for happy path', async () => {
  // render app
  render(<App />);

  //add ice cream scoops and toppings
  const MandMCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '2');
  userEvent.click(MandMCheckbox);

  // find and click the order button

  const orderButton = screen.getByRole('button', { name: 'Order Sundae!' });
  userEvent.click(orderButton);

  // Order Summary Page
  // check that summary information is correct based on order
  const scoopsTotal = screen.getByRole('heading', { name: /Scoops: \$/ });
  const toppingsTotal = screen.getByRole('heading', { name: /Toppings: \$/ });
  const Total = screen.getByRole('heading', { name: /Total:/ });

  expect(scoopsTotal).toHaveTextContent('4.00');
  expect(toppingsTotal).toHaveTextContent('1.50');
  expect(Total).toHaveTextContent('5.50');

  // accept terms and conditions and click button to confirm order
  const termsCheckbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  const confirmOrderButton = screen.getByRole('button', {
    name: 'Confirm order',
  });
  userEvent.click(termsCheckbox);
  userEvent.click(confirmOrderButton);

  // Order Confirmation Page
  // confirm order number on confirmation page

  // Expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const orderNumber = await screen.findByText('Your order number is', {
    exact: false,
  });
  expect(orderNumber).toHaveTextContent('123455676', { exact: false });

  const notLoading = screen.queryByText('Loading');
  expect(notLoading).not.toBeInTheDocument();

  // click new order button on confirmation page

  const newOrderButton = screen.getByRole('button', {
    name: /Create New Order/,
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  // These two have awaits to allow time for the state to be reset.
  const toppingsSubtotal = await screen.findByText('Toppings total:', {
    exact: false,
  });
  const scoopsSubtotal = await screen.findByText('Scoops total:', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // do we need to await anything to avoid test errors?
});
