import React from "react";
import personService from "./services/persons.js";
import "./App.css";

const Title = ({ text }) => {
  return <h2>{text}</h2>;
};

const TextInput = ({ label, value, handleChange }) => {
  return (
    <div>
      {label}: <input value={value} onChange={handleChange} />
    </div>
  );
};

const Person = ({ person, handleClick }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}{" "}
        <button onClick={() => handleClick(person)}>poista</button>
      </p>
    </div>
  );
};

const Notification = ({ notification }) => {
  return notification === undefined ? null : (
    <div className={`notification-${notification.style}`}>
      {notification.message}
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      newName: "",
      newNumber: "",
      filter: "",
      notification: undefined,
      notificationDelay: 3000
    };
  }

  componentWillMount() {
    personService.getAll().then(persons => this.setState({ persons }));
  }

  addName = event => {
    event.preventDefault();
    const name = this.state.newName;
    const number = this.state.newNumber;
    let persons = this.state.persons;

    const existingPerson = persons.find(p => p.name === name);

    if (existingPerson !== undefined) {
      if (
        !window.confirm(
          `${name} on jo luettelossa, korvataanko vanha numero uudella?`
        )
      ) {
        return;
      }

      existingPerson.number = number;

      personService
        .update(existingPerson.id, existingPerson)
        .then(person =>
          this.setState({
            persons: persons
              .filter(p => p.id !== existingPerson.id)
              .concat(person)
          })
        )
        .then(() => {
          this.setState({
            notification: {
              message: `Muutettiin puhelinnumero henkilöltä ${
                existingPerson.name
              }`,
              style: "success"
            }
          });
          this.hideNotification();
        });

      return;
    }

    const person = { name: name, number: number };

    personService
      .create(person)
      .then(person => {
        this.setState({
          persons: persons.concat(person),
          newName: "",
          newNumber: "",
          duplicate: false
        });
      })
      .then(() => {
        this.setState({
          notification: {
            message: `Lisättiin ${person.name}`,
            style: "success"
          }
        });
        this.hideNotification();
      });
  };

  handleNameChange = event => {
    this.setState({ newName: event.target.value });
  };

  handleNumberChange = event => {
    this.setState({ newNumber: event.target.value });
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  handleRemove = person => {
    if (!window.confirm(`Poistetaanko ${person.name}?`)) {
      return;
    }

    personService
      .remove(person.id)
      .then(r =>
        this.setState({
          persons: this.state.persons.filter(p => p.id !== person.id)
        })
      )
      .then(() => {
        this.setState({
          notification: {
            message: `Poistettiin ${person.name}`,
            style: "success"
          }
        });
        this.hideNotification();
      });
  };

  hideNotification() {
    setTimeout(() => {
      this.setState({ notification: undefined });
    }, this.state.notificationDelay);
  }

  render() {
    return (
      <div>
        <Title text="Puhelinluettelo" />

        <Notification notification={this.state.notification} />

        <TextInput
          label="rajaa näytettäviä"
          value={this.state.filter}
          handleChange={this.handleFilterChange}
        />

        <Title text="Lisää uusi" />

        <form onSubmit={this.addName}>
          <TextInput
            label="nimi"
            value={this.state.newName}
            handleChange={this.handleNameChange}
          />

          <TextInput
            label="numero"
            value={this.state.newNumber}
            handleChange={this.handleNumberChange}
          />

          <div>
            <button type="submit">lisää</button>
          </div>
        </form>

        <Title text="Numerot" />

        {this.state.persons
          .filter(p =>
            p.name.toLowerCase().includes(this.state.filter.toLowerCase())
          )
          .map(p => (
            <Person key={p.name} person={p} handleClick={this.handleRemove} />
          ))}
      </div>
    );
  }
}

export default App;
