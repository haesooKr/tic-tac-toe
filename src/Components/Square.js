import React, { Component } from "react";

export default class Square extends Component {
  state = {
    value: null
  };
  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.setState({ value: "X" })}
        >
        {this.state.value}
      </button>
    );
  }
}
