import React from "react";

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
        <Title text="Puhelinluettelo" />

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
            {this.state.duplicate && <p>nimi on jo listalla</p>}
          </div>
        </form>

        <Title text="Numerot" />

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
