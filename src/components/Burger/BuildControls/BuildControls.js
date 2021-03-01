import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => {
  const transformedArray = Object.keys(props.labels).map((label) => (
    <BuildControl
      key={label}
      label={label.charAt(0).toUpperCase() + label.slice(1)}
      added={() => props.ingredientAdded(label)}
      removed={() => props.ingredientRemoved(label)}
      disabled={props.disabled[label]}
    />
  ));

  return (
    <div className={classes.BuildControls}>
      <p>
        <strong>Current Price:{props.price.toFixed(2)}</strong>
      </p>
      {transformedArray}
      <button
        disabled={!props.purchaseable}
        className={classes.OrderButton}
        onClick={props.ordered}
      >
        Order Now
      </button>
    </div>
  );
};
export default BuildControls;
