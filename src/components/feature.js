import React, {Component} from 'react';
import {scaleLinear} from 'd3-scale';
import {axisBottom, axisLeft} from 'd3-axis';
import {histogram, min, max} from 'd3-array';
import {select} from 'd3-selection';

export default class Feature extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: ''
    };
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    if (this.props.data && this.state.selectedValue) {
      const songs = this.props.songs;
      const traitValues = songs.reduce((res, d) => {
        if (d.selected) {
          res.push(d[this.state.selectedValue]);
        }
        return res;
      }, []);
      const yScale = scaleLinear()
      .domain([min(traitValues), max(traitValues)])
      .range([this.props.height - 25, 0]);
      const histData = histogram()
      .domain(yScale.domain())
      .thresholds(yScale.ticks(5))(traitValues);
      const xScale = scaleLinear()
      .domain([0, max(histData, function getLength(d) {
        return d.length;
      })])
      .range([0, this.props.width - 20]);
      const xAxis = axisBottom(xScale);
      const yAxis = axisLeft(yScale);
      if (this.state.selectedValue !== this.state.bucketValue) {
        this.setState({x: xScale, y: yScale, buckets: histData, bucketValue: this.state.selectedValue});
      }
      select(this.songFrequencyElement).call(axisG => axisG.call(xAxis));
      select(this.bucketsElement).call(axisG => axisG.call(yAxis));
    }
  }

  changeSelectedValue(e) {
    this.setState({selectedValue: e.target.value});
  }

  render() {
    const {
      height,
      width,
      data
    } = this.props;
    const {
      selectedValue,
      buckets,
      x,
      y
    } = this.state;
    return (
      <div>
        <div className="feature-heading">
          <h1>Feature Component</h1>
        </div>
        <div className="feature">
          <div className="feature-dropdown">
            <select onChange={(e) => this.changeSelectedValue(e)}>
              <option>Select Audio Feature</option>
              <option value="valence">Valence</option>
              <option value="liveness">Liveness</option>
              <option value="acousticness">Acousticness</option>
              <option value="energy">Energy</option>
              <option value="danceability">Danceability</option>
            </select>
          </div>
          <div className="feature-chart">
            <svg className="feature-svg" height={height} width={width}>
              <g
                ref={(el) => {
                  this.songFrequencyElement = el;
                }}
                transform={`translate(30, ${height - 25})`}/>
              {buckets ? buckets.map((bucket, idx) => {
                return (
                  <rect
                    key={`feature_${idx}`}
                    height={y(bucket.x0) - y(bucket.x1)}
                    width={x(bucket.length)}
                    x={30}
                    y={y(bucket.x1)}
                    fill={data.scales[selectedValue](((bucket.x1 - bucket.x0) / 2) + bucket.x0)} />
                );
              }) : null}
              <g
                ref={(el) => {
                  this.bucketsElement = el;
                }}
                transform={'translate(30)'}/>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
