import React, { Component } from "react";

class Song extends Component {

  render() {
    return (
      <div className="song-container">
        <img src={this.props.currentSong.cover} alt={this.props.currentSong.name} />
        <h2>{this.props.currentSong.name}</h2>
        <h3>{this.props.currentSong.artist}</h3>
      </div>
    )
  }
}

export default Song;