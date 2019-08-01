import React from "react";

const PersonForm = ({ onChangeName, onChangeNumber, newName, newNumber, onClickAction }) => {
  return (
    <form>
      <div>
        name:{" "}
        <input type="text" value={newName} onChange={onChangeName} required />
      </div>
      <div>
        number:{" "}
        <input
          type="text"
          value={newNumber}
          onChange={onChangeNumber}
          required
        />
      </div>
      <div>
        <button type="submit" onClick={onClickAction}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
