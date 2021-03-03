import React, { Component } from 'react';
import Auxilliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log('order summary component did update');
  }

  render() {
    const ingredients = Object.keys(this.props.ingredients).map((igKey) => (
      <li key={igKey}>
        {igKey.charAt(0).toUpperCase() + igKey.slice(1)}:{' '}
        {this.props.ingredients[igKey]}
      </li>
    ));
    return (
      <Auxilliary>
        <h3>Your Order</h3>
        <p>Your Burger will be prepared with the following ingredients</p>
        <ul>{ingredients}</ul>
        <p>
          <strong>Total Price: ${this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxilliary>
    );
  }
}

export default OrderSummary;
