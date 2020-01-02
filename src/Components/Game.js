import React, { Component } from 'react'
import Board from './Board';

export default class Game extends Component {
    state = {
        history: [{
            squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true
    }
    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        console.log(history);
        const current = history[history.length - 1];
        const squares = [...current.squares];
        
        if(calculateWinner(squares)) return null;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
            'Go to move #' + move :
            'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if(winner){
            status = `Winner is ${winner}`
        } else {
            status = `Next Player is ${this.state.xIsNext ? 'X' : 'O'}`
        }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares} 
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  const calculateWinner = (squares) => {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let line of lines){
        const [a,b,c] = line;
        if( squares[a] && 
            squares[a] === squares[b] && 
            squares[a] === squares[c]) {
            return squares[a];
        }
        return null;
    }
}