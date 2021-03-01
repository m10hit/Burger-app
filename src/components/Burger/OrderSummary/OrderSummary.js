import React from 'react';
import Auxilliary from '../../../hoc/Auxiliary';

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
      <p>Continue to Checkout?</p>
    </Auxilliary>
  );
};

export default OrderSummary;