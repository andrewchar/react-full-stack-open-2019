import React from "react";

const Person = ({ keyID, name, number }) => {
  return (
    <p key={keyID}>
      {name} {number}
    </p>
  );
};

export default Person;
