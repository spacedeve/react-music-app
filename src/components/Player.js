import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
//Utils
import data from './../utils';

class Player extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the audioRef DOM element
    this.audioRef = React.createRef();
    //State
    this.state = {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    }
  }
  //Event Handlers
  playSongHandler = () => {
    if (this.state.isPlaying) {
      this.audioRef.current.pause();
      this.setState(e => ({ isPlaying: !e.isPlaying }))
    } else {
      this.audioRef.current.play();
      this.setState(e => ({ isPlaying: !e.isPlaying }))
    }
  }

  timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    this.setState({ currentTime: current, duration: duration })
  }

  getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    )
  }

  dragHandler = (e) => {
    this.audioRef.current.currentTime = e.target.value;
    this.setState({ currentTime: e.target.value })
  }


  render() {
    return (
      <div className="player">
        <div className="time-control">
          <p>{this.getTime(this.state.currentTime)}</p>
          <input
            type="range"
            onChange={this.dragHandler}
            min={0}
            max={this.state.duration}
            value={this.state.currentTime}
          />
          <p>{this.getTime(this.state.duration)}</p>
        </div>
        <div className="play-control">
          <FontAwesomeIcon className="skip-back" icon={faAngleLeft} size='2x' />
          <FontAwesomeIcon className="play" icon={this.state.isPlaying ? faPause : faPlay} size='2x' onClick={this.playSongHandler} />
          <FontAwesomeIcon className="skip-forward" icon={faAngleRight} size='2x' />
        </div>
        <audio
          onTimeUpdate={this.timeUpdateHandler}
          onLoadedData={this.timeUpdateHandler}
          ref={this.audioRef}
          src={this.props.currentSong.audio}
        ></audio>
      </div>
    )
  }
}

export default Player;