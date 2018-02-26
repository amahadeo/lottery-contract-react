import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = { manager: "" };
  // }
  state = {
    // new es6 syntax for declaring initial state, equivalent to above - variables declared at top are bumped into constructor
    manager: "",
    players: [],
    balance: "",
    value: ""
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call(); // do not need to specify {from: accounts[0]} when using metamask provider
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contracted is managed by {this.state.manager}. There are
          currently {this.state.players.length} people entered, competing to win{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether!
        </p>
        <hr />
        <form>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
      </div>
    );
  }
}

export default App;
