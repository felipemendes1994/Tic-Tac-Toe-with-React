import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();

    this.state = {
      winner: '',
      message: '',
      turn: 'x'
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
      if(this.gameState.turn === 'x'){
        event.target.innerHTML = '<i class="fas fa-times"></i>';
      }else if(this.gameState.turn === 'o'){
        event.target.innerHTML = '<i class="far fa-circle"></i>';
      }

      this.gameState.board[event.target.dataset.square] = this.gameState.turn;
      this.gameState.turn = this.gameState.turn === 'x' ? 'o' : 'x';
      this.setState({turn: this.gameState.turn});
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

  newMatch(){
    window.location.reload();
  }

  render() {

    return (
        <div className="container-fluid bg-dark h-100 clearfix">
          
          <div className="container float-left bg-warning col-6 h-100">
            <div id="board" className="h-100 justify-content-center align-items-center" onClick={(e) => this.clicked(e)}>
              <div> 
                <div className="square border-dark text-center align-items-center" data-square="0"></div>
                <div className="square border-dark text-center align-items-center" data-square="3"></div>
                <div className="square border-dark text-center align-items-center" data-square="6"></div>
              </div>
              <div>  
                <div className="square border-dark text-center align-items-center" data-square="1"></div>
                <div className="square border-dark text-center align-items-center" data-square="4"></div>
                <div className="square border-dark text-center align-items-center" data-square="7"></div>
              </div> 
              <div>  
                <div className="square border-dark text-center align-items-center" data-square="2"></div>
                <div className="square border-dark text-center align-items-center" data-square="5"></div>
                <div className="square border-dark text-center align-items-center" data-square="8"></div>
              </div>
            </div>
          </div>

          <div className="container float-left bg-danger col-6 h-100">
            <div className="h-100 justify-content-center align-items-center options">
                  <button type="button" className="btn btn-outline-warning btn-block btn-lg disabled">1 Player</button>
                  <button type="button" className="btn btn-outline-warning btn-block btn-lg active" >2 Players</button>
                  <br /><br /><br />
                  <button type="button" className="btn btn-outline-warning btn-block btn-lg" onClick={() => this.newMatch()}>New Match</button>
                  <br /><br /><br />

                  <h2>Turn: {this.state.turn}</h2>
                  <br/><br /><br />

                  <h1>{this.state.message}</h1>
            </div>
          </div>
          

        </div>
    );
  }
}

export default App;
