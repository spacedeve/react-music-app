import React, { Component } from "react";
import Example from "./components/Example";
//Conponents
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
//Styles
import './styles/App.scss';
//Utils
import data from './utils';

class App extends Component {
  constructor() {
    super();
    this.state = {
      songs: data(),
      currentSong: data()[0],
    };
    this.setCurrentSong = this.setCurrentSong.bind(this);
  }

  setCurrentSong(element) {
    this.setState({ currentSong: element });
  }

  render() {
    return (
      <div className="App">
        <Song
          currentSong={this.state.currentSong}
        />
        <Player
          currentSong={this.state.currentSong}
        />
        <Library
          songs={this.state.songs}
          setCurrentSong={this.setCurrentSong}
        />
      </div>
    )
  }
}

export default App;