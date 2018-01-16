import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const Title = ({ text }) => {
  return <h2>{text}</h2>;
};

const Button = ({ handleClick, name }) => {
  return <button onClick={() => handleClick(name)}>{name}</button>;
};

const Statistics = ({ statistics }) => {
  if (statistics.total == 0) {
    return <p>no feedback given yet</p>;
  }

  return (
    <div>
      <Statistic name="good" value={statistics.good} />
      <Statistic name="neutral" value={statistics.neutral} />
      <Statistic name="bad" value={statistics.bad} />
      <Statistic
        name="mean"
        value={Math.max(
          (statistics.good - statistics.bad) / statistics.total,
          0
        )}
      />
      <Statistic
        name="positive"
        value={statistics.good / statistics.total * 100}
        suffix=" %"
      />
    </div>
  );
};

const Statistic = ({ name, value, suffix }) => {
  return (
    <p>
      {name}: {value}
      {suffix}
    </p>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      statistics: {
        good: 0,
        neutral: 0,
        bad: 0,
        total: 0
      }
    };
  }

  addFeedback = name => {
    let statistics = this.state.statistics;
    statistics[name] = statistics[name] + 1;
    statistics.total = statistics.total + 1;
    this.setState({ statistics: statistics });
  };

  render() {
    return (
      <div className="App">
        <Title text="leave feedback" />
        <Button name="good" handleClick={this.addFeedback} />
        <Button name="neutral" handleClick={this.addFeedback} />
        <Button name="bad" handleClick={this.addFeedback} />
        <Title text="statistics" />
        <Statistics statistics={this.state.statistics} />
      </div>
    );
  }
}

export default App;
