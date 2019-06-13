import React from 'react';
import {csv} from 'd3-fetch';
import PieChart from './piechart'
import Map from './map';
// import World from './data/world-data';


export default class WhoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: null
    };
    this.World = require('./../static/top-five.json');

  }

  click(input){
    console.log(input);
    this.setState((input) => {
      return {selectedCountry: input};
    });
  }

  render() {
    const whoData = {
      USA: [
        ['Post Malone', 39699916],
        ['Kendrick Lamar', 21223395],
        ['G-Eazy', 19889476],
        ['Migos', 17442167],
        ['Lil Uzi Vert', 17397323]
      ]
    }
    return (
      <div className="relative">
        <Map data={this.World} selectedCountry={this.state.selectedCountry}
             click={country => this.setState({selectedCountry: country})}/>
        {this.state.selectedCountry && whoData ?
          <PieChart
            selectedCountry={this.state.selectedCountry}
            whoData={whoData}
            height={400}
            width={400}
          /> : null
        }
      </div>
    );
  }
}
