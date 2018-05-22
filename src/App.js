import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();

    this.state = {
      winner: '',
      message: ''
    }

    this.gameState = {
      board: Array(9).fill(''),
      turn: 'x',
      rounds: 0,
      locked: false,
    }

  }

  clicked(event){
    if(! this.gameState.board[event.target.dataset.square] && this.gameState.locked === false){
      event.target.innerText = this.gameState.turn;

      this.gameState.board[event.target.dataset.square] = this.gameState.turn;
      this.gameState.turn = this.gameState.turn === 'x' ? 'o' : 'x';
      this.gameState.rounds = this.gameState.rounds + 1;
      
      var result = this.checkCombination();

      if(result === 'x'){
        this.gameState.locked = true;
        this.setState({winner: 'x', message: 'Match won by x!'});
      } else if(result === 'o'){
        this.gameState.locked = true;
        this.setState({winner: 'o', message: 'Match won by o!'});
      }else if(result === 'draw'){
        this.gameState.locked = true;
        this.setState({winner: 'Drawn', message: 'Match Drawn!'});
      }
    }
  }

  checkCombination(){

    var combos = [ [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8] ];
    var board = this.gameState.board;

    for(let i = 0; i < combos.length; i++){
      if(board[combos[i][0]] === board[combos[i][1]] && board[combos[i][1]] === board[combos[i][2]]){
        return board[combos[i][0]];
      }
    }

    if(this.gameState.rounds === 9){
      return 'draw';
    }
  }

  render() {

    return (
      <div id="game">
        <div id="head">{this.state.message}</div>

        <div id="board" onClick={(e) => this.clicked(e)}>
          <div className="square" data-square="0"></div>
          <div className="square" data-square="1"></div>
          <div className="square" data-square="2"></div>
          <div className="square" data-square="3"></div>
          <div className="square" data-square="4"></div>
          <div className="square" data-square="5"></div>
          <div className="square" data-square="6"></div>
          <div className="square" data-square="7"></div>
          <div className="square" data-square="8"></div>
        </div>
      </div>
    );
  }
}

export default App;
