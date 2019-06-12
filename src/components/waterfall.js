/* eslint-disable no-invalid-this */
/* eslint-disable func-names */
import React, {Component} from 'react';
import {scaleLinear, scaleBand} from 'd3-scale';
import {axisBottom, axisLeft} from 'd3-axis';
import {select} from 'd3-selection';

/*
*   Given a data object, generates a waterfall of the songs inside.
*   The order of the columns (L->R) is as follows: valence, liveness, accousticness, energy, danceability.
*   INPUT: data (Object)
*     svg (Object)
*     height (Number)
*     width (Number)
*     traits (Array)
*   OUTPUT: Nothing returned but should draw a waterfall on svg
*/
function drawWaterfall(svg, data, height, width, traits) {
  const songs = data.songs;
  const x = scaleLinear()
    .domain([0, 1])
    .range([0, width]);

  const songNames = scaleBand()
    .domain(songs.map(d => d.name))
    .range([0, height])
    .padding(0.1);

  // append the rectangles for the bar chart
  svg.selectAll('.waterfallBar')
    .data(songs)
    .enter().append('g')
    .attr('class', 'waterfallBar')
    .attr('width', width)
    .attr('y', d => songNames(d.name))
    .attr('height', songNames.bandwidth())
    .selectAll('.colorBar')
    .data(traits)
    .enter()
    .append('rect')
    .attr('class', 'colorBar');
  // Go over our bars and create the new bars inside each
  // This was a massive pain to figure out without just hard coding every bar
  // It looks a lot shorter now that I found a clean way to do it lmao I hate my life
  svg.selectAll('.waterfallBar')
    .each(function(parentDatum) {
      const parent = select(this);
      parent.selectAll('.colorBar').each(function(childDatum, i) {
        select(this).attr('width', x(1 - (i * 0.2)))
          .attr('height', songNames.bandwidth())
          .attr('y', parent.attr('y'))
          .attr('fill', data.scales[childDatum](parentDatum[childDatum]));
      });
    });

  // add the songNames Axis
  svg.append('g')
    .call(axisLeft(songNames));

  const traitsOrdered = traits.reverse().map(word => word.toUpperCase());
  const xAxis = scaleBand()
    .domain(traitsOrdered)
    .range([0, width]);

  // add the x Axis
  svg.append('g')
    .attr('transform', `translate(0,${ height })`)
    .call(axisBottom(xAxis));
}

export default class Waterfall extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    const {
      height,
      width,
      songs,
      traits,
      scales,
      updateSelectedSongs,
      selectedSongs
    } = this.props;
    const x = scaleLinear()
      .domain([0, 1])
      .range([0, width]);

    const songNames = scaleBand()
      .domain(songs.map(d => d.name))
      .range([0, height])
      .padding(0.1);
    return (
      <div className={'waterfall_container'}>
        <svg className={'waterfall_svg'} width={width} height={height}>
          {songs.map((song, idx) => {
            return (
              <g className="waterfallBar"
                width={width}
                height={songNames.bandwidth()}
                y={songNames(song.name)
              }>
                {traits.map((trait, jdx) => {
                  return (
                    <rect
                      height={songNames.bandwidth()}
                      y={songNames(song.name)}
                      width={x(1 - (jdx * 0.2))}
                      fill={scales[trait](song[trait])} />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    );
  }
}
