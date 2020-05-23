import React from 'react';

const Switch = (props) => {
  const { isTrue, handleToggle, type } = props;

  return (
    <div className="switch">
      <input
        type="checkbox"
        checked={isTrue}
        onChange={handleToggle}
        className={`switch-checkbox`}
        id={`switch-${type}`}
      />
      <label className={`switch-label-${type}`} htmlFor={`switch-${type}`}>
        <div className="ball" />
      </label>
    </div>
  );
};

export default Switch;
