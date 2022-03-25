import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

class Player extends Component {
  constructor(props) {
    super(props);

    //State
    this.state = {

    }
  }

  //Event Handlers
  activeSongHandler = (nextPrev) => {
    const newSong = this.props.songs.map((song) => {
      if (song.id === nextPrev.id) {
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
  }


  getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    )
  }

  dragHandler = (e) => {
    this.props.audioRef.current.currentTime = e.target.value;
    this.setState({ currentTime: e.target.value })
  }

  skipSongHandler = async (direction) => {
    let currentIndex = this.props.songs.findIndex(song => song.id === this.props.currentSong.id);
    if (direction === 'skip-forward') {
      await this.props.setCurrentSong(this.props.songs[(currentIndex + 1) % this.props.songs.length]);
      this.activeSongHandler(this.props.songs[(currentIndex + 1) % this.props.songs.length]);
    }
    if (direction === 'skip-back') {
      if ((currentIndex - 1) % this.props.songs.length === -1) {
        await this.props.setCurrentSong(this.props.songs[(this.props.songs.length - 1)]);
        this.activeSongHandler(this.props.songs[(this.props.songs.length - 1)]);
        this.props.audioRef.current.play();
        return;
      }
      await this.props.setCurrentSong(this.props.songs[(currentIndex - 1)]);
      this.activeSongHandler(this.props.songs[(currentIndex - 1)]);
    }
    if (this.props.isPlaying) {
      this.props.audioRef.current.play();
    }
  }

  render() {

    return (
      <div className="player">
        <div className="time-control">
          <p>{this.getTime(this.props.currentTime)}</p>
          <div className="track" style={{ background: `linear-gradient(to right, ${this.props.currentSong.gradientColor[0]}, ${this.props.currentSong.gradientColor[1]})` }}>
            <input
              type="range"
              onChange={this.dragHandler}
              min={0}
              max={this.props.duration || 0}
              value={this.props.currentTime}
            />
            <div className="animate-track" style={{ transform: `translateX(${this.props.animationPercentage}%)` }}></div>
          </div>
          <p>{this.props.duration ? this.getTime(this.props.duration) : "0:00"}</p>
        </div>
        <div className="play-control">
          <FontAwesomeIcon className="skip-back" onClick={() => this.skipSongHandler("skip-back")} icon={faAngleLeft} size='2x' />
          <FontAwesomeIcon className="play" icon={this.props.isPlaying ? faPause : faPlay} size='2x' onClick={this.props.playSongHandler} />
          <FontAwesomeIcon className="skip-forward" onClick={() => this.skipSongHandler("skip-forward")} icon={faAngleRight} size='2x' />
        </div>
      </div >
    )
  }
}

export default Player;