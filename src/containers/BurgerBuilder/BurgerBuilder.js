import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    this.setState({ purchaseable: sum > 0 });
  };

  addIngredientHandler = (label) => {
    const ingredients = { ...this.state.ingredients };
    ingredients[label] += 1;
    const priceAddition = INGREDIENT_PRICES[label];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({ ingredients: ingredients, totalPrice: newPrice });
    this.updatePurchaseState(ingredients);
  };

  removeIngredientHandler = (label) => {
    const ingredients = { ...this.state.ingredients };
    if (ingredients[label] <= 0) {
      return;
    }
    ingredients[label] -= 1;
    const priceDeduction = INGREDIENT_PRICES[label];
    const newPrice = this.state.totalPrice - priceDeduction;
    this.setState({ ingredients: ingredients, totalPrice: newPrice });
    this.updatePurchaseState(ingredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert('you continue!');
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'RahulGupta',
        address: {
          street: 'test street',
          zipcode: '2113',
          country: 'Australia',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'Fast delivery',
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
        console.log(response);
      })
      .catch((err) => {
        this.setState({ loading: false, purchasing: false });
        console.log(err);
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let order = (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />
    );
    if (this.state.loading) order = <Spinner />;
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {order}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          labels={this.state.ingredients}
          ingredientRemoved={this.removeIngredientHandler}
          ingredientAdded={this.addIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
        />
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
