import React, { PureComponent } from "react";
import PropTypes from "prop-types";

//import './NextPos.css'

class NextPos extends PureComponent {
  static propTypes = {
    updatePos: PropTypes.func.isRequired
  };
  handleClick = e => {
    this.props.updatePos(e.target.cx.baseVal.value, e.target.cy.baseVal.value);
  };
  render() {
    const { x, delta_x, y, delta_y } = this.props;
    const common = {
      onClick: this.handleClick,
      r: 0.45
    };
    return (
      <g className="NextPos">
        <circle cx={x + delta_x + 1} cy={y + delta_y + 1} {...common} />
        <circle cx={x + delta_x + 0} cy={y + delta_y + 1} {...common} />
        <circle cx={x + delta_x - 1} cy={y + delta_y + 1} {...common} />
        <circle cx={x + delta_x + 1} cy={y + delta_y + 0} {...common} />
        <circle cx={x + delta_x + 0} cy={y + delta_y + 0} {...common} />
        <circle cx={x + delta_x - 1} cy={y + delta_y + 0} {...common} />
        <circle cx={x + delta_x + 1} cy={y + delta_y - 1} {...common} />
        <circle cx={x + delta_x + 0} cy={y + delta_y - 1} {...common} />
        <circle cx={x + delta_x - 1} cy={y + delta_y - 1} {...common} />
      </g>
    );
  }
}

export default NextPos;
