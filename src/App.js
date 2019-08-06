import React, { useState, useEffect } from "react";
import axios from "axios";

import contactService from "./services/contacts";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const onChangeName = event => setNewName(event.target.value);
  const onChangeNumber = event => setNewNumber(event.target.value);

  const fetchData = () => contactService.getAll().then(res => setPersons(res));

  useEffect(() => {
    fetchData();
  }, []);

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
                key={contact.id}
                keyID={contact.id}
                name={contact.name}
                number={contact.number}
                remove={deleteContact}
              />
            );
          })
      );
    } else {
      setFilteredContacts(
        persons.map(contact => {
          return (
            <Person
              key={contact.id}
              keyID={contact.id}
              name={contact.name}
              number={contact.number}
              remove={deleteContact}
            />
          );
        })
      );
    }
  }, [filterName, persons, isFiltering]);

  const deleteContact = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      contactService.remove(id).then(res => fetchData());
    }
  };

  const addPerson = event => {
    event.preventDefault();

    // returns the person object or undefined if not found
    const doesNameAlreadyExist = persons.find(el => {
      return el.name === newName;
    });

    const contactToUpdate = { ...doesNameAlreadyExist };
    contactToUpdate.newNumber = newNumber;
    console.log(doesNameAlreadyExist, contactToUpdate);

    if (doesNameAlreadyExist !== undefined) {
      // alert(`${newName} is already added to phonebook`);
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        contactService
          .update(contactToUpdate)
          .then(res => fetchData());
          // .then(fetchData());
      }
    }

    if (newName !== "" && doesNameAlreadyExist === undefined) {
      const contactObj = {
        name: newName,
        number: formatPhoneNumber(newNumber)
      };
      contactService
        .create(contactObj)
        .then(newPerson => setPersons(persons.concat(newPerson)));
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
