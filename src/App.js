import React, { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "(555) 555-5555" },
    { name: "Ada Lovelace", number: "(555) 555-5555" },
    { name: "Dan Abramov", number: "(555) 555-5555" },
    { name: "Mary Poppendieck", number: "(555) 555-5555" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const onChangeName = event => setNewName(event.target.value);
  const onChangeNumber = event => setNewNumber(event.target.value);

  useEffect(() => {
    if (isFiltering) {
      setFilteredContacts(
        persons
          .filter(person => {
            return person.name
              .toLowerCase()
              .includes(filterName.toLocaleLowerCase());
          })
          .map(contact => {
            return (
              <Person
                key={contact.name}
                name={contact.name}
                number={contact.number}
              />
            );
          })
      );
    } else {
      setFilteredContacts(
        persons.map(contact => {
          return (
            <Person
              key={contact.name}
              name={contact.name}
              number={contact.number}
            />
          );
        })
      );
    }
  }, [filterName, persons, isFiltering]);

  const addPerson = event => {
    event.preventDefault();

    const doesNameExist = persons.findIndex(el => el.name === newName);

    if (doesNameExist === 1) {
      alert(`${newName} is already added to phonebook`);
    }

    if (newName !== "" && doesNameExist === -1) {
      setPersons(
        persons.concat({ name: newName, number: formatPhoneNumber(newNumber) })
      );
    }

    setNewName("");
    setNewNumber("");
  };

  const formatPhoneNumber = phoneNumberString => {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return newNumber;
  };

  const searchContacts = event => {
    setFilterName(event.target.value);
    event.target.value.length ? setIsFiltering(true) : setIsFiltering(false);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChangeAction={searchContacts} />
      <h2>add a new</h2>
      <PersonForm
        onChangeName={onChangeName}
        onChangeNumber={onChangeNumber}
        newName={newName}
        newNumber={newNumber}
        onClickAction={addPerson}
      />
      <h2>Numbers</h2>
      {filteredContacts}
    </div>
  );
};

export default App;
