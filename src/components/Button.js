import React from 'react';
import { FaLightbulb, FaKey, FaFilter } from 'react-icons/fa';

const Button = (props) => {
  const { handleToggle, type, isChecked } = props;
  let icon;

  if (type === 'switch') {
    icon = <FaLightbulb />;
  } else if (type === 'key') {
    icon = <FaKey />;
  } else if (type === 'side') {
    icon = <FaFilter />;
  }

  return (
    <>
      <input
        type="checkbox"
        onChange={handleToggle}
        checked={isChecked}
        id={`${type}`}
        className={`invisible ${type}-checkbox`}
      />
      <label className={`${type}-label`} htmlFor={`${type}`}>
        <div className="icon">{icon}</div>
      </label>
    </>
  );
};

export default Button;
