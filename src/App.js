import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: true,
      optionDisplay: true,
      cpu: "",
      gameTurn: "",
      player1: "",
      player2: "",
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
      six: "",
      seven: "",
      eight: "",
      nine: "",
      ten: "",
      playCount: 0,
      mode: ""
    };
    this.addXO = this.addXO.bind(this);
    this.setPlayerX = this.setPlayerX.bind(this);
    this.setPlayerO = this.setPlayerO.bind(this);
    this.setMode = this.setMode.bind(this);
    this.setModeCPU = this.setModeCPU.bind(this);
    this.playCPU = this.playCPU.bind(this);
  }

  addXO(event) {
    const { id } = event.target;
    if (this.state.mode == "human") {
      if (this.state[id] == "") {
        if (this.state.gameTurn == "Player 1") {
          this.setState({
            [id]: this.state.player1,
            playCount: this.state.playCount + 1,
            gameTurn: "Player 2"
          });
          setTimeout(() => this.checkWinner(), 1000);
        } else {
          this.setState({
            [id]: this.state.player2,
            playCount: this.state.playCount + 1,
            gameTurn: "Player 1"
          });
          setTimeout(() => this.checkWinner(), 1000);
        }
      }
    } else {
      const { id } = event.target;
      if (this.state[id] == "") {
        if (this.state.gameTurn == "Player 1") {
          this.setState({
            [id]: this.state.player1,
            playCount: this.state.playCount + 1,
            gameTurn: "Computer"
          });
          this.showPlayer();
          setTimeout(() => this.checkWinner(), 1000);
          setTimeout(() => this.playCPU(), 2000);
        } else {
          setTimeout(() => this.playCPU(), 2000);
        }
      }
    }
  }
  showPlayer() {
    return "Go " + this.state.gameTurn + "!";
  }
  playCPU() {
    let idArray = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine"
    ];
    let randomID = idArray[Math.floor(Math.random() * 10)];
    if (this.state[randomID] == "") {
      if (this.state.gameTurn == "Computer") {
        this.setState({
          [randomID]: this.state.cpu,
          playCount: this.state.playCount + 1,
          gameTurn: "Player 1"
        });
        this.showPlayer();
        setTimeout(() => this.checkWinner(), 1000);
      }
    } else {
      this.playCPU();
    }
  }

  checkWinner() {
    if (
      (this.state.one !== "" &&
        this.state.one == this.state.two &&
        this.state.two == this.state.three) ||
      (this.state.four !== "" &&
        this.state.four == this.state.five &&
        this.state.five == this.state.six) ||
      (this.state.seven !== "" &&
        this.state.seven == this.state.eight &&
        this.state.eight == this.state.nine) ||
      (this.state.one !== "" &&
        this.state.one !== "" &&
        this.state.one == this.state.four &&
        this.state.four == this.state.seven) ||
      (this.state.two !== "" &&
        this.state.two == this.state.five &&
        this.state.five == this.state.eight) ||
      (this.state.three !== "" &&
        this.state.three == this.state.six &&
        this.state.six == this.state.nine) ||
      (this.state.one !== "" &&
        this.state.one == this.state.five &&
        this.state.five == this.state.nine) ||
      (this.state.three !== "" &&
        this.state.three == this.state.five &&
        this.state.five == this.state.seven)
    ) {
      if (this.state.gameTurn == "Computer") {
        alert("Player 1 wins!");
      } else if (
        this.state.gameTurn == "Player 1" &&
        this.state.mode == "cpu"
      ) {
        alert("Computer wins!");
      } else if (
        this.state.gameTurn == "Player 1" &&
        this.state.mode == "human"
      ) {
        alert("Player 2 wins!");
      } else if (this.state.gameTurn == "Player 2") {
        alert("Player 1 wins!");
      }
      this.setState({
        one: "",
        two: "",
        three: "",
        four: "",
        five: "",
        six: "",
        seven: "",
        eight: "",
        nine: "",
        ten: "",
        playCount: 0
      });
    } else if (this.state.playCount == 9) {
      alert("DRAW!");
      this.setState({
        one: "",
        two: "",
        three: "",
        four: "",
        five: "",
        six: "",
        seven: "",
        eight: "",
        nine: "",
        ten: "",
        playCount: 0
      });
    }
  }
  setPlayerX() {
    let turnArray = ["Player 1", "Player 2"];
    let randomTurn = turnArray[Math.floor(Math.random() * 2)];
    let cpuTurnArray = ["Player 1", "Computer"];
    let cpuRandomTurn = cpuTurnArray[Math.floor(Math.random() * 2)];
    if (this.state.mode == "cpu") {
      this.setState({
        start: false,
        player1: "X",
        cpu: "O",
        optionDisplay: false,
        gameTurn: cpuRandomTurn
      });
      setTimeout(() => this.startCPU(), 1000);
      this.showPlayer();
    } else {
      this.setState({
        start: false,
        player1: "X",
        player2: "O",
        optionDisplay: false,
        gameTurn: randomTurn
      });
    }
  }
  setPlayerO() {
    let turnArray = ["Player 1", "Player 2"];
    let randomTurn = turnArray[Math.floor(Math.random() * 2)];
    let cpuTurnArray = ["Player 1", "Computer"];
    let cpuRandomTurn = cpuTurnArray[Math.floor(Math.random() * 2)];
    if (this.state.mode == "cpu") {
      this.setState({
        start: false,
        player1: "O",
        cpu: "X",
        optionDisplay: false,
        gameTurn: cpuRandomTurn
      });
      this.showPlayer();
      setTimeout(() => this.startCPU(), 1000);
    } else {
      this.setState({
        start: false,
        player1: "O",
        player2: "X",
        optionDisplay: false,
        gameTurn: randomTurn
      });
    }
  }
  startCPU() {
    if (this.state.gameTurn == "Computer") {
      setTimeout(() => this.playCPU(), 2000);
    }
  }
  setMode() {
    this.setState({
      mode: "human",
      start: false
    });
  }
  setModeCPU() {
    this.setState({
      mode: "cpu",
      start: false
    });
  }

  render() {
    return (
      <div id="container">
        {this.state.start && (
          <h2>
            How do you want to play?
            <br />
            <button id="onePlayerBtn" onClick={this.setModeCPU}>
              One player
            </button>
            --
            <button id="twoPlayerBtn" onClick={this.setMode}>
              two player?
            </button>
          </h2>
        )}
        {this.state.mode == "human" && this.state.optionDisplay == true && (
          <h2>
            Player 1, would you like to be{" "}
            <button id="Xbutton" onClick={this.setPlayerX}>
              'X'
            </button>{" "}
            or{" "}
            <button id="Obutton" onClick={this.setPlayerO}>
              'O?'
            </button>
          </h2>
        )}
        {this.state.mode == "cpu" && this.state.optionDisplay == true && (
          <h2>
            Would you like to be{" "}
            <button id="Xbutton" onClick={this.setPlayerX}>
              'X'
            </button>{" "}
            or{" "}
            <button id="Obutton" onClick={this.setPlayerO}>
              'O?'
            </button>
          </h2>
        )}
        {this.state.start == false &&
          this.state.mode == "human" &&
          this.state.player1 !== "" && (
            <h3 id="player-text">{this.showPlayer()}</h3>
          )}
        {this.state.start == false &&
          this.state.mode == "cpu" &&
          this.state.cpu !== "" &&
          this.state.playCount < 9 && (
            <h3 id="player-text">{this.showPlayer()}</h3>
          )}
        <table>
          <tr>
            <td onClick={this.addXO} id="one" class="area">
              {this.state.one}
            </td>
            <td onClick={this.addXO} id="two" class="area">
              {this.state.two}
            </td>
            <td onClick={this.addXO} id="three" class="area">
              {this.state.three}
            </td>
          </tr>
          <tr>
            <td onClick={this.addXO} id="four" class="area">
              {this.state.four}
            </td>
            <td onClick={this.addXO} id="five" class="area">
              {this.state.five}
            </td>
            <td onClick={this.addXO} id="six" class="area">
              {this.state.six}
            </td>
          </tr>
          <tr>
            <td onClick={this.addXO} id="seven" class="area">
              {this.state.seven}
            </td>
            <td onClick={this.addXO} id="eight" class="area">
              {this.state.eight}
            </td>
            <td onClick={this.addXO} id="nine" class="area">
              {this.state.nine}
            </td>
          </tr>
        </table>
        <h1>Tic-Tac-Toe</h1>
      </div>
    );
  }
}

export default App;
