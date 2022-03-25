import React, { Component } from "react";
import LibrarySong from "./LibrarySong";


class Library extends Component {


  render() {
    return (
      <div className={`library ${this.props.libraryStatus ? 'active-library' : ''}`}>
        <h2>Library</h2>
        <div className="library-songs">
          {this.props.songs.map((song) => (
            <LibrarySong
              songs={this.props.songs}
              setSongs={this.props.setSongs}
              setCurrentSong={this.props.setCurrentSong}
              song={song}
              key={song.id}
              audioRef={this.props.audioRef}
              isPlaying={this.props.isPlaying}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Library;