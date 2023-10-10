// This radial graph template was made by Richard Ekwonye:
// https://stackblitz.com/edit/react-radial-chart?file=index.js

import React, { Component } from "react";
import classNames from "classnames";
import "./radial-css.css";

const DEFAULT_COLOR = "#040404";
class RadialGraph extends Component {
  state = {};

  componentDidMount() {
    // For initial animation
    setTimeout(() => {
      this.setState({ setStrokeLength: true });
    });
  }

  render() {
    const { setStrokeLength } = this.state;
    const { radius, progress, strokeWidth, color } = this.props;
    const circleRadius = Math.min(radius, 85);
    const circumference = 2 * 3.14 * circleRadius;
    const strokeLength = setStrokeLength ? (circumference / 100) * progress : 0;

    return (
      <div
        className={classNames(
          "radial-chart",
          {
            "no-progress": strokeLength === 0,
          },
          "flex",
          "items-center",
          "justify-center"
        )}
      >
        {/* <svg viewBox="0 0 180 180" width={dimension} height={dimension}> */}
        <svg viewBox="0 0 180 180" className="w-full h-full">
          <circle
            className="flex radial-chart-total"
            stroke="#D1D1D1"
            strokeWidth={strokeWidth}
            fill="none"
            cx="90"
            cy="90"
            r={circleRadius}
          />
          <circle
            className="flex radial-chart-progress"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${strokeLength},${circumference}`}
            strokeLinecap="round"
            fill="none"
            cx="90"
            cy="90"
            r={circleRadius}
          />
        </svg>
      </div>
    );
  }
}

RadialGraph.defaultProps = {
  radius: 80,
  progress: 100,
  strokeWidth: 20,
  // dimension: 180,
  color: DEFAULT_COLOR,
};

export default RadialGraph;
