/* eslint-disable no-invalid-this */
/* eslint-disable func-names */
import React, {Component} from 'react';
import {scaleLinear, scaleBand} from 'd3-scale';
import {axisBottom, axisLeft} from 'd3-axis';
import {select} from 'd3-selection';

export default class Waterfall extends Component {
  constructor(props) {
    super(props);
    const x = scaleLinear()
      .domain([0, 1])
      .range([0, props.width - 200]);

    const songNames = scaleBand()
      .domain(props.songs.map(d => d.name))
      .range([0, props.height - 20])
      .padding(0.1);

    this.state = {
      x,
      songNames
    };
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const yAxis = axisLeft(this.state.songNames);
    const xAxis = axisBottom(this.state.x);
    select(this.songAxisElement).call(axisG => axisG.call(yAxis));
    select(this.traitAxisElement).call(axisG => axisG.call(xAxis));
  }

  render() {
    const {
      height,
      width,
      songs,
      traits,
      scales,
      selectSong,
      deselectSong
    } = this.props;
    const {
      x,
      songNames
    } = this.state;

    return (
      <div className={'waterfall_container'}>
        <svg className={'waterfall_svg'} width={width} height={height}>
          <g
            ref={(el) => {
              this.songAxisElement = el;
            }}
            transform={'translate(195)'}/>
          {songs.map((song, idx) => {
            return (
              <g className="waterfallBar"
                key={`g_${song.name}`}
                width={width - 200}
                height={songNames.bandwidth()}
                y={songNames(song.name)}
                transform={'translate(200)'}
                onClick={d => song.selected ? deselectSong(idx) : selectSong(idx)}
              >
                {traits.map((trait, jdx) => {
                  return (
                    <rect
                      key={`rect_${song.name}_${trait}`}
                      height={songNames.bandwidth()}
                      y={songNames(song.name)}
                      width={x(1 - (jdx * 0.2))}
                      fill={song.selected ? scales[trait](song[trait]) : 'black'} />
                  );
                })}
              </g>
            );
          })}
          <g
            ref={(el) => {
              this.traitAxisElement = el;
            }}
            transform={`translate(200, ${height - 20})`}/>
        </svg>
      </div>
    );
  }
}
