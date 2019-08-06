import React from "react";

const Person = ({ keyID, name, number, remove }) => {
  return (
    <div>
      <span>
        {name} {number}
      </span>
      <button style={{ marginLeft: 10 }} onClick={() => remove(keyID, name)}>
        delete
      </button>
    </div>
  );
};

export default Person;
