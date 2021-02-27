import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
class App extends Component {
  handleClick() {
    console.log(this);
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.handleClick}>
          Click Me
        </button>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
