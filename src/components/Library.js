import React, { Component } from "react";
import LibrarySong from "./LibrarySong";


class Library extends Component {
  constructor(props) {
    super(props);
    //State
    this.state = {
      setCurrentSong: this.props.setCurrentSong,
    }
  }
  render() {
    return (
      <div className="library">
        <h2>Library</h2>
        <div className="library-songs">
          {this.props.songs.map((song) => (
            <LibrarySong
              songs={this.props.songs}
              setCurrentSong={setCurrentSong}
              song={song}
              id={song.id}
              key={song.id} />
          ))}
        </div>
      </div>
    )
  }
}

export default Library;