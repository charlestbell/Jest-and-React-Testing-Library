import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [orderNumber, setOrderNumber] = useState();

  const [, , resetOrder] = useOrderDetails();

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then(response => setOrderNumber(response.data.orderNumber))
      .catch(error => {});
  }, []);

  const newOrderHandler = () => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  if (orderNumber) {
    return (
      <div>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p>as per our terms and conditions, nothing will happen now</p>
        <Button onClick={newOrderHandler}>Create New Order</Button>
      </div>
    );
  } else {
    return <h2>Loading</h2>;
  }
};

export default OrderConfirmation;
