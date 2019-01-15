import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Functional component - Square
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// Class component
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initialize square state with null to all
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    // A copy of squares array
    const squares = this.state.squares.slice();
    // Ignore if it has a winner
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Set X or O to button clicked
    // Ternary operator
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // Update local (board) state
    this.setState({ 
      squares: squares,
      xIsNext: !this.state.xIsNext, 
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// Class component
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// React DOM handler
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
