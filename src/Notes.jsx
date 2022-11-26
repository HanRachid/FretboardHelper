import React, { Component } from "react";
import "./App.css";
export default class Notes extends Component {
  constructor(props) {
    super();
    this.subsequent = this.subsequent.bind(this);
  }

  subsequent(n) {
    return this.props.middleC * 2 ** (n / 12);
  }

  render() {
    return (
      <div className="note">
        <div
          style={{
            backgroundColor:
              this.props.colors[
                this.props.Scale.indexOf(this.props.chosenNote)
              ],
            fontSize: "24px",
            fontWeight: "600",
          }}
          className="notename"
        >
          {this.props.chosenNote}
        </div>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "500",
          }}
          className="noteinfos"
        >
          {this.props.Scale.indexOf(this.props.chosenNote) + 1}
        </div>
      </div>
    );
  }
}
