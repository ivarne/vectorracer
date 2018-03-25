import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import CurrentPos from "./CurrentPos";
import NextPos from "./NextPos";

import "./Game.css";
import Trace from "./Trace";
import StopLine from "./StopLine";
import Walls from "./Walls";
import { intersect } from "../../utils/intersect";

const walls = [
  {
    type: "rect",
    x: 10,
    y: 10,
    height: 30,
    width: 30
  }
];

class Game extends PureComponent {
  static propTypes = {
    size_x: PropTypes.number.isRequired,
    size_y: PropTypes.number.isRequired,
    initial_x: PropTypes.number.isRequired,
    initial_y: PropTypes.number.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      x: props.initial_x,
      y: props.initial_y,
      delta_x: 0,
      delta_y: 0,
      trace: [[props.initial_x, props.initial_y]],
      walls: walls
    };
  }
  isValidNextPos(x, y) {
    const s = this.state;
    if (x > s.x + s.delta_x + 1 || x < s.x + s.delta_x - 1) return false;
    if (y > s.y + s.delta_y + 1 || y < s.y + s.delta_y - 1) return false;
    return !s.walls.some(wall => intersect(wall, [[s.x, s.y], [x, y]]));
    return true; // TODO; check wals
  }
  updatePos = (x, y) => {
    this.setState(s => {
      if (!this.isValidNextPos(x, y)) return {};
      return {
        trace: [...s.trace, [x, y]],
        x,
        y,
        delta_x: x - s.x,
        delta_y: y - s.y
      };
    });
  };
  handleClick = event => {
    const pt = this.svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    const cursopt = pt.matrixTransform(this.svg.getScreenCTM().inverse());

    this.updatePos(Math.round(cursopt.x), Math.round(cursopt.y));
  };
  goBack = event => {
    if (this.state.trace.length < 2) return;
    this.setState(s => {
      const newTrace = s.trace.slice(0, -1);
      const pos = newTrace[newTrace.length - 1];
      let delta = [0, 0];
      if (newTrace.length > 1) {
        const lastpos = newTrace[newTrace.length - 2];
        delta = [pos[0] - lastpos[0], pos[1] - lastpos[1]];
      }
      return {
        trace: newTrace,
        x: pos[0],
        y: pos[1],
        delta_x: delta[0],
        delta_y: delta[1]
      };
    });
  };

  render() {
    const { size_x, size_y } = this.props;
    return (
      <div className="Game">
        <h1>Vectorracer{this.state.trace.length}</h1>
        <button onClick={this.goBack}>Undo</button>
        <svg
          className="Game"
          viewBox={`-2 -2 ${size_x + 4} ${size_y + 4}`}
          onClick={this.handleClick}
          ref={ref => {
            this.svg = ref;
          }}
        >
          <Grid size_x={size_x} size_y={size_y} />
          <Walls walls={walls} />
          <Trace trace={this.state.trace} />
          <CurrentPos {...this.state} />
          <StopLine {...this.state} {...this.props} />
          <NextPos {...this.state} />
        </svg>
      </div>
    );
  }
}

export default Game;
