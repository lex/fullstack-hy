import React from "react";
import ReactDOM from "react-dom";

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {votes || "0"} votes</p>
    </div>
  );
};

const Button = ({ handleClick }) => {
  return <button onClick={handleClick}>next anecdote</button>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      votes: {}
    };
  }

  voteAnecdote = () => {
    return () => {
      let votes = this.state.votes;
      let selected = this.state.selected;
      votes[selected] = votes[selected] === undefined ? 1 : votes[selected] + 1;
      this.setState({ votes: votes });
    };
  };

  nextAnecdote = size => {
    return () => {
      this.setState({ selected: Math.floor(Math.random() * size) });
    };
  };

  render() {
    return (
      <div>
        <Anecdote
          text={this.props.anecdotes[this.state.selected]}
          votes={this.state.votes[this.state.selected]}
        />
        <button onClick={this.voteAnecdote()}>vote</button>
        <button onClick={this.nextAnecdote(this.props.anecdotes.length)}>
          next anecdote
        </button>
      </div>
    );
  }
}

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
