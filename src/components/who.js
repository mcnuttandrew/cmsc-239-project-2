import React from 'react';
import {csv} from 'd3-fetch';
import PieChart from './piechart'
import Map from './map';

export default class WhoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: 'us'
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
    const {
      whoData
    } = this.props;
    return (
      <div className="relative">
        <Map/>
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
