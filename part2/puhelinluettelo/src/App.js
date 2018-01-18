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
      persons: [
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Martti Tienari", number: "040-123456" },
        { name: "Arto Järvinen", number: "040-123456" },
        { name: "Lea Kutvonen", number: "040-123456" }
      ],
      newName: "",
      newNumber: "",
      filter: "",
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

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          rajaa näytettäviä:{" "}
          <input value={this.state.filter} onChange={this.handleFilterChange} />
        </div>
        <h2>Lisää uusi</h2>
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
        {this.state.persons
          .filter(p =>
            p.name.toLowerCase().includes(this.state.filter.toLowerCase())
          )
          .map(p => <Person key={p.name} person={p} />)}
      </div>
    );
  }
}

export default App;
