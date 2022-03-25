import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

class Nav extends Component {

  render() {
    return (
      <nav>
        <h1>Waves</h1>
        <button onClick={this.props.setLibraryStatus}>
          Library
          <FontAwesomeIcon icon={faMusic} />
        </button>
      </nav >
    )
  }
}

export default Nav;