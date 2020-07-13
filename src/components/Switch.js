import React from 'react';
import { FaLightbulb } from 'react-icons/fa';

const Switch = (props) => {
  const { isChecked, handleToggle, type } = props;

  return (
    <div className="switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className={`switch-checkbox`}
        id={`switch-${type}`}
      />
      <label className={`switch-label-${type}`} htmlFor={`switch-${type}`}>
        <div className="icon">
          <FaLightbulb />
        </div>
      </label>
    </div>
  );
};

export default Switch;
