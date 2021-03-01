import React from 'react';
import Auxilliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  // <li>Salad: 1</li>
  // <li>Meat:3</li>
  const ingredients = Object.keys(props.ingredients).map((igKey) => (
    <li key={igKey}>
      {igKey.charAt(0).toUpperCase() + igKey.slice(1)}:{' '}
      {props.ingredients[igKey]}
    </li>
  ));
  return (
    <Auxilliary>
      <h3>Your Order</h3>
      <p>Your Burger will be prepared with the following ingredients</p>
      <ul>{ingredients}</ul>
      <p>
        <strong>Total Price: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Auxilliary>
  );
};

export default OrderSummary;
