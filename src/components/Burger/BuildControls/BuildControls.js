import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => {
  const transformedArray = Object.keys(props.labels).map((label) => (
    <BuildControl
      key={label}
      label={label.charAt(0).toUpperCase() + label.slice(1)}
    />
  ));

  return <div className={classes.BuildControls}>{transformedArray}</div>;
};
export default BuildControls;
