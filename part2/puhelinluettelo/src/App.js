import React from "react";

const Person = props => {
  return <p>{props.name}</p>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [{ name: "Arto Hellas" }],
      newName: ""
    };
  }

  addName = event => {
    event.preventDefault();
    const name = this.state.newName;
    let persons = this.state.persons;
    persons.push({ name: name });
    this.setState({ persons, newName: "" });
  };

  handleNameChange = event => {
    this.setState({ newName: event.target.value });
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
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.map(person => (
          <Person key={person.name} name={person.name} />
        ))}
      </div>
    );
  }
}

export default App;
