import React from "react";

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [{ name: "Arto Hellas", number: "040-123456" }],
      newName: "",
      newNumber: "",
      duplicate: false
    };
  }

  addName = event => {
    event.preventDefault();
    const name = this.state.newName;
    const number = this.state.newNumber;
    let persons = this.state.persons;

    if (persons.filter(p => p.name === name).length > 0) {
      this.setState({ duplicate: true });
      return;
    }

    persons.push({ name: name, number: number });
    this.setState({ persons, newName: "", newNumber: "", duplicate: false });
  };

  handleNameChange = event => {
    this.setState({ newName: event.target.value });
  };

  handleNumberChange = event => {
    this.setState({ newNumber: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi:{" "}
            <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            numero:{" "}
            <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
            {this.state.duplicate && <p>nimi on jo listalla</p>}
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.map(person => (
          <Person key={person.name} person={person} />
        ))}
      </div>
    );
  }
}

export default App;
