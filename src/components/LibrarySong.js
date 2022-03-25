import React, { Component } from "react";

class LibrarySong extends Component {
  constructor(props) {
    super(props);

  }
  //Event Handlers
  songSelectHandler = async () => {
    const selectedSong = this.props.songs.filter((state) => state.id === this.props.song.id);
    await this.props.setCurrentSong(selectedSong[0]);
    //Set active state
    const newSong = this.props.songs.map((song) => {
      if (song.id === this.props.song.id) {
        return {
          ...song, active: true
        }
      } else {
        return {
          ...song, active: false
        }
      }
    });
    this.props.setSongs(newSong);
    if (this.props.isPlaying) {
      this.props.audioRef.current.play();
    }
  }

  render() {
    return (

      <div onClick={this.songSelectHandler} className={`library-song ${this.props.song.active ? 'selected' : ''}`} >
        <img alt={this.props.song.name} src={this.props.song.cover} />
        <div className="song-description">
          <h3>{this.props.song.name}</h3>
          <h4>{this.props.song.artist}</h4>
        </div>
      </ div >
    )

  }
}

export default LibrarySong;