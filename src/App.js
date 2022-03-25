import React, { Component } from "react";
//Conponents
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//Styles
import './styles/App.scss';
//DATA
import data from './data';

class App extends Component {
  constructor() {
    super();
    // create a ref to store the audioRef DOM element
    this.audioRef = React.createRef();
    this.state = {
      songs: data(),
      currentSong: data()[0],
      currentTime: 0,
      duration: 0,
      animationPercentage: 0,
      isPlaying: false,
      libraryStatus: false,
    };
    this.setCurrentSong = this.setCurrentSong.bind(this);
    this.setSongs = this.setSongs.bind(this);
  }

  //Events handlers
  setCurrentSong(element) {
    this.setState({ currentSong: element });
  }

  setSongs(element) {
    this.setState({ songs: element })
  }

  timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const animationPercentage = Math.round((Math.round(current) / Math.round(duration)) * 100);
    this.setState({ currentTime: current, duration: duration, animationPercentage: animationPercentage })
  }

  playSongHandler = () => {
    if (this.state.isPlaying) {
      this.audioRef.current.pause();
      this.setState(e => ({ isPlaying: !e.isPlaying }))
    } else {
      this.audioRef.current.play();
      this.setState(e => ({ isPlaying: !e.isPlaying }))
    }
  }

  setLibraryStatus = () => {
    this.setState(e => ({ libraryStatus: !e.libraryStatus }))
  }

  songEndHandler = async () => {
    let currentIndex = this.state.songs.findIndex(song => song.id === this.state.currentSong.id);
    await this.setCurrentSong(this.state.songs[(currentIndex + 1) % this.state.songs.length]);
    if (this.state.isPlaying) {
      this.audioRef.current.play();
    }
  }


  render() {
    return (
      <div className={`App ${this.state.libraryStatus ? 'library-active' : ''}`}>
        <Nav
          setLibraryStatus={this.setLibraryStatus}
        />
        <Song
          currentSong={this.state.currentSong}
        />
        <Player
          audioRef={this.audioRef}
          songs={this.state.songs}
          setSongs={this.setSongs}
          currentSong={this.state.currentSong}
          setCurrentSong={this.setCurrentSong}
          playSongHandler={this.playSongHandler}
          currentTime={this.state.currentTime}
          duration={this.state.duration}
          animationPercentage={this.state.animationPercentage}
          isPlaying={this.state.isPlaying}
        />
        <Library
          songs={this.state.songs}
          setSongs={this.setSongs}
          setCurrentSong={this.setCurrentSong}
          audioRef={this.audioRef}
          isPlaying={this.state.isPlaying}
          libraryStatus={this.state.libraryStatus}
        />
        <audio
          onTimeUpdate={this.timeUpdateHandler}
          onLoadedData={this.timeUpdateHandler}
          onEnded={this.songEndHandler}
          ref={this.audioRef}
          src={this.state.currentSong.audio}
        ></audio>
      </div>
    )
  }
}

export default App;