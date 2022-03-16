import React, { Component } from "react";

class LibrarySong extends Component {
  constructor(props) {
    super(props);
    //States
    this.state = {
      setCurrentSong: this.props.setCurrentSong,
    }
  }
  //Event Handlers
  songSelectHandler = () => {
    const selectedSong = this.props.songs.filter((state) => state.id === this.props.id);
    this.setState({ setCurrentSong: selectedSong[0] })
  }

  render() {
    return (

      <div onClick={this.songSelectHandler} className="library-song">
        <img alt={this.props.song.name} src={this.props.song.cover} />
        <div className="song-description">
          <h3>{this.props.song.name}</h3>
          <h4>{this.props.song.artist}</h4>
        </div>
      </div>
    )

  }
}

export default LibrarySong;