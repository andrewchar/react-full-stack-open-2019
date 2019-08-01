import React from "react";

const Filter = ({ value, onChangeAction }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChangeAction} />
    </div>
  );
};

export default Filter;
