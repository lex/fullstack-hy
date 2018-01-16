import React from "react";
import ReactDOM from "react-dom";

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <p>{anecdote.text}</p>
      <p>has {anecdote.votes} votes</p>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      mostVoted: undefined,
      anecdotes: this.props.anecdotes.reduce((acc, cur) => {
        acc.push({ text: cur, votes: 0 });
        return acc;
      }, [])
    };
  }

  voteAnecdote = () => {
    return () => {
      let anecdotes = this.state.anecdotes;
      let anecdote = anecdotes[this.state.selected];
      anecdote.votes += 1;

      let mostVoted = anecdotes.reduce((previous, current) => {
        return current.votes > previous.votes ? current : previous;
      }, anecdotes[0]);

      this.setState({ anecdotes: anecdotes, mostVoted: mostVoted });
    };
  };

  nextAnecdote = size => {
    return () => {
      this.setState({
        selected: Math.floor(Math.random() * this.state.anecdotes.length)
      });
    };
  };

  render() {
    return (
      <div>
        <Anecdote anecdote={this.state.anecdotes[this.state.selected]} />
        <button onClick={this.voteAnecdote()}>vote</button>
        <button onClick={this.nextAnecdote()}>next anecdote</button>
        {this.state.mostVoted !== undefined && (
          <div>
            <h2>anecdote with most votes:</h2>
            <Anecdote anecdote={this.state.mostVoted} />
          </div>
        )}
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
