import React from 'react';
import {csv} from 'd3-fetch';
import {prepareData} from './../prepareData';
import Waterfall from './waterfall';
import Feature from './feature';
import Median from './median';
import WhoComponent from './who';


class RootComponent extends React.Component {
  constructor() {
    super();

    const metaProps = ['name', 'artists', 'id'];
    const traits = ['danceability', 'energy', 'acousticness', 'liveness', 'valence'];

    prepareData('./data/songs.csv', metaProps, traits).then(data => {
      this.state = {
        songs: data.songs,
        data: null
      };
    });
  }

  componentWillMount() {
    // csv('data/sample-data.csv')
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
        <Waterfall data={this.state.songs}/>
        <Feature data={this.state.songs}/>
        <Median data={this.state.songs}/>
        <WhoComponent/>
      </div>
    );
  }
}

RootComponent.displayName = 'RootComponent';
export default RootComponent;
