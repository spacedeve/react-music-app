import React, { Component } from 'react';

class Example extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Hello there',
      job: 'Web developer',
      age: Math.floor(Math.random() * 10),
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <h2>I'm {this.state.age} {this.state.age === 1 ? 'year' : 'years'} old</h2>
        <button onClick={() => this.setState({ name: 'General Kenobi' })}>Click me</button>
        <p>{this.props.kekw}</p>
      </div>
    )
  }
}

export default Example;