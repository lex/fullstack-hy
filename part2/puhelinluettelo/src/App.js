import React from "react";
import axios from "axios";

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
      persons: [],
      newName: "",
      newNumber: "",
      filter: "",
      duplicate: false
    };
  }

  componentWillMount() {
    const url = "http://localhost:3001/persons";
    axios.get(url).then(response => this.setState({ persons: response.data }));
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

    const person = { name: name, number: number };
    const url = "http://localhost:3001/persons";
    axios.post(url, person).then(response => {
      this.setState({
        persons: persons.concat(response.data),
        newName: "",
        newNumber: "",
        duplicate: false
      });
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
