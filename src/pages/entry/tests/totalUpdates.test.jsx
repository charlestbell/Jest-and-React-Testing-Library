import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

it('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total:', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update the vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update the chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

it('update toppings subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />);

  // make sure total starts out at $0.00
  const toppingsSubtotal = screen.getByText('Toppings total:', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // Add M&M topping and check the subtotal
  const MandMCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
  userEvent.click(MandMCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // Add Hot fudge topping and check the subtotal
  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  // Remove a topping and check the subtotal
  userEvent.click(MandMCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  it('grand total updates properly if scoop is added first, and initial setup', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total:/i });
    //Check that the grand total starts at 0
    expect(grandTotal).toHaveTextContent('0.00');
    // Add Scoops
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');
    // Add Topping
    const MandMCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
    userEvent.click(MandMCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  it('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total:/i });

    // Add Topping
    const MandMCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
    userEvent.click(MandMCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    // Add Scoops
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });
  it('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total:/i });

    // Add Scoops
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    // Add Topping
    const MandMCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
    userEvent.click(MandMCheckbox);

    // Remove Scoop
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');
  });
});
