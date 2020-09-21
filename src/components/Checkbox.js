import React from 'react';
import { FiCheck } from 'react-icons/fi';

const Checkbox = (props) => {
  const { handleCheck, value, type, name, isChecked } = props;

  return (
    <>
      <input
        type="checkbox"
        value={value}
        name={name}
        onChange={handleCheck}
        className={`invisible ${type}-checkbox`}
        id={`filter-${value}`}
        checked={isChecked}
      />
      <label className={`${type}-label`} htmlFor={`filter-${value}`}>
        <div className="icon">
          <FiCheck />
        </div>
        <div className="value">{value}</div>
      </label>
    </>
  );
};

export default Checkbox;
