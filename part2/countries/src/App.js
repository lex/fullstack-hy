import React, { Component } from "react";
import axios from "axios";

const Country = ({ country }) => {
  return <div>{country.name}</div>;
};

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img alt={country.name} style={{ width: "600px" }} src={country.flag} />
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryName: "",
      countries: [],
      filteredCountries: []
    };
  }

  componentWillMount() {
    this.getCountries();
  }

  getCountries() {
    const url = "https://restcountries.eu/rest/v2/all";
    axios.get(url).then(r => this.setState({ countries: r.data }));
  }

  findCountries = event => {
    let searchTerm = event.target.value;
    let countries = this.state.countries;

    const filteredCountries = countries.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ filteredCountries });
  };

  render() {
    return (
      <div className="App">
        <div>
          find countries:
          <input onChange={this.findCountries} />
        </div>
        <div>
          {this.state.filteredCountries.length <= 10 ? (
            this.state.filteredCountries.length === 1 ? (
              <CountryDetails country={this.state.filteredCountries[0]} />
            ) : (
              this.state.filteredCountries.map(c => (
                <Country key={c.name} country={c} />
              ))
            )
          ) : (
            <p>too many matches, specify another filter</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
