import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import CurrentPos from "./CurrentPos";
import NextPos from "./NextPos";

import "./Game.css";
import Trace from "./Trace";
import StopLine from "./StopLine";

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
      trace: [[props.initial_x, props.initial_y]]
    };
  }
  updatePos = (x, y) => {
    this.setState(s => ({
      trace: [...s.trace, [x, y]],
      x,
      y,
      delta_x: x - s.x,
      delta_y: y - s.y
    }));
  };

  render() {
    const { size_x, size_y } = this.props;
    return (
      <svg className="Game" viewBox={`-1 -1 ${size_x + 2} ${size_y + 2}`}>
        <Grid size_x={size_x} size_y={size_y} />
        <Trace trace={this.state.trace} />
        <CurrentPos {...this.state} />
        <StopLine {...this.state} {...this.props} />
        <NextPos {...this.state} updatePos={this.updatePos} />
      </svg>
    );
  }
}

export default Game;
