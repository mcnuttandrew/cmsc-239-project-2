import React from 'react';
import {csv} from 'd3-fetch';
import PieChart from './piechart'
import Map from './map';


export default class WhoComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCountry: null
    };
  }

  componentWillMount() {
    // import kaggle data on daily streams
    //
    // csv('data/other.csv')
    //   .then(data => {
    //     this.setState({
    //       data,
    //       loading: false
    //     });
    //   });
  }

  render() {
    return (
      <div className="relative">
        <Map/>
        {this.state.selectedCountry ? <PieChart selectedCountry={this.state.selectedCountry}/> : null}
      </div>
    );
  }
}
