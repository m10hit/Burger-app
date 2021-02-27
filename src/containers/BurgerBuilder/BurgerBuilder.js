import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 2,
      cheese: 2,
      bacon: 1,
    },
  };
  render() {
    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <>Controls</>
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
