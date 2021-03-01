import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
  };

  addIngredientHandler = (label) => {
    const ingredients = { ...this.state.ingredients };
    ingredients[label] += 1;
    const priceAddition = INGREDIENT_PRICES[label];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({ ingredients: ingredients, totalPrice: newPrice });
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
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          labels={this.state.ingredients}
          ingredientRemoved={this.removeIngredientHandler}
          ingredientAdded={this.addIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
