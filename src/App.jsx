import React, { Component } from "react";
import "./App.css";
import Notes from "./Notes";

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      isMajor: true,
      chosenScale: "Major",
      major: [2, 4, 5, 7, 9, 11],
      minor: [2, 3, 5, 7, 8, 10],
      colors: [
        "red",
        "purple",
        "blue",
        "fuchsia",
        "green",
        "saddlebrown",
        "pink",
      ],
      colorsall: [
        "red",
        "grey",
        "purple",
        "grey",
        "blue",
        "fuchsia",
        "grey",
        "green",
        "grey",
        "saddlebrown",
        "grey",
        "pink",
      ],
      majorScale: ["A", "B", "C#", "D", "E", "F#", "G#"],
      minorScale: ["A", "B", "C", "D", "E", "F", "G"],
      currentchosenScale: ["A", "B", "C#", "D", "E", "F#", "G#"],
      guitarOpen: ["E", "B", "G", "D", "A", "E"],
      chosenNote: "A",
      currentScale: [
        "A",
        "A#",
        "B",
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
      ],
      chromaticScale: [
        "A",
        "A#",
        "B",
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
      ],
      change: "aaa",
    };
    this.guitarString = this.guitarString.bind(this);
    this.Scale = this.Scale.bind(this);
    this.chooseScale = this.chooseScale.bind(this);
    this.scaleFlipper = this.scaleFlipper.bind(this);
    this.chooseScale = this.chooseScale.bind(this);
  }
  scaleFlipper(Array, position) {
    for (let i = 0; i <= position - 1; i++) {
      Array.push(Array[i]);
    }
    for (let i = 0; i <= position - 1; i++) {
      Array.shift();
    }
    return Array;
  }

  guitarString(openNote) {
    const newArray = [...this.state.chromaticScale];

    this.scaleFlipper(newArray, newArray.indexOf(openNote));

    const newishArray = [...newArray, ...newArray];

    return newishArray;
  }
  Scale(e, isMajor) {
    this.setState({ chosenNote: e.target.value });

    const tempmajorScale = [...this.state.chromaticScale];
    const currentPosition = this.state.chromaticScale.indexOf(e.target.value);
    this.scaleFlipper(tempmajorScale, currentPosition);
    this.setState({ currentScale: tempmajorScale });
    const majorScale = [e.target.value];
    this.state.major.forEach((element) => {
      majorScale.push(tempmajorScale[element]);
    });

    this.setState({ majorScale: majorScale });

    const tempminorScale = [...this.state.chromaticScale];

    this.scaleFlipper(tempminorScale, currentPosition);
    this.setState({ currentScale: tempminorScale });
    const minorScale = [e.target.value];
    this.state.minor.forEach((element) => {
      minorScale.push(tempminorScale[element]);
    });

    this.setState({ minorScale: minorScale }, () =>
      this.chooseScale(this.state.chosenScale)
    );
  }

  chooseScale(scale) {
    if (scale === "Major") {
      this.setState({
        currentchosenScale: this.state.majorScale,
        chosenScale: "Major",
      });
    } else if (scale === "Minor") {
      this.setState({
        currentchosenScale: this.state.minorScale,
        chosenScale: "Minor",
      });
    }
    console.log(this.state.currentchosenScale);
  }

  render() {
    return (
      <div>
        <h1 className="helper">Fretboard memorization helper</h1>
        <label>Choose a scale:</label>
        <select
          onClick={(e) => {
            if (e.target.value !== this.state.chosenNote) {
              this.Scale(e, this.state.isMajor);
            }
          }}
          id="cars"
          name="cars"
        >
          <option value="A">A</option>
          <option value="A#">A#</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="C#">C#</option>
          <option value="D">D</option>
          <option value="D#">D#</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="F#">F#</option>
          <option value="G">G</option>
          <option value="G#">G#</option>
        </select>
        <button
          style={{
            backgroundColor: "rgb(43, 168, 226)",
            width: "100px",
            height: "30px",
            margin: "10px",
            border: "none",
          }}
          onClick={() => {
            this.chooseScale("Minor");
          }}
        >
          Minor
        </button>

        <button
          style={{
            backgroundColor: "rgb(43, 168, 226)",
            width: "100px",
            height: "30px",
            margin: "10px",
            border: "none",
          }}
          onClick={() => {
            this.chooseScale("Major");
          }}
        >
          Major
        </button>
        <div>Chromatic : </div>
        <div className="scales">
          {this.state.currentScale.map((e) => {
            return (
              <Notes
                chosenNote={e}
                middleC={440}
                colors={this.state.colorsall}
                Scale={this.state.currentScale}
                chromaticScale={this.scaleFlipper(this.state.chromaticScale)}
              ></Notes>
            );
          })}
        </div>
        <div> Major : </div>
        <div className="major">
          {this.state.majorScale.map((e) => {
            return (
              <Notes
                chosenNote={e}
                middleC={440}
                colors={this.state.colors}
                currentScale={this.state.currentScale}
                chromaticScale={this.state.chromaticScale}
                Scale={this.state.majorScale}
              ></Notes>
            );
          })}
        </div>
        <div> Minor : </div>
        <div className="major">
          {this.state.minorScale.map((e) => {
            return (
              <Notes
                chosenNote={e}
                middleC={440}
                colors={this.state.colors}
                currentScale={this.state.currentScale}
                chromaticScale={this.state.chromaticScale}
                Scale={this.state.minorScale}
              ></Notes>
            );
          })}
        </div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "500",
            margin: "20px",
          }}
        >
          {this.state.chosenScale} Fretboard
        </div>
        <div>
          {this.state.guitarOpen.map((e) => {
            return (
              <div className="strings">
                {this.guitarString(e).map((string) => {
                  if (this.state.currentchosenScale.includes(string)) {
                    return (
                      <div className={"fret"}>
                        <div
                          style={{
                            backgroundColor:
                              this.state.colors[
                                this.state.currentchosenScale.indexOf(string)
                              ],
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                          className={"positionfret " + string}
                        >
                          {string}
                        </div>
                        <div className="fretline"></div>
                      </div>
                    );
                  } else {
                    return (
                      <div className={"fret"}>
                        <div
                          style={{
                            backgroundColor: "white",
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                          className={"positionfret " + string}
                        >
                          {string}
                        </div>
                        <div className="fretline"></div>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {this.state.chromaticScale.map((e) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "55px",
                    height: "30px",
                    fontFamily: "fantasy",
                    fontSize: "24px",
                  }}
                >
                  {this.guitarString("A").indexOf(e)}
                </div>
              );
            })}

            {this.state.chromaticScale.map((e) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "55px",
                    height: "30px",
                    fontFamily: "fantasy",
                    fontSize: "24px",
                  }}
                >
                  {this.guitarString("A").indexOf(e) + 12}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
