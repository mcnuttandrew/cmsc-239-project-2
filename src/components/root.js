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

    this.state = {
      isLoaded: false,
      songs: null,
      data: null,
      metaProps: ['name', 'artists', 'id'],
      traits: ['danceability', 'energy', 'acousticness', 'liveness', 'valence']
    };
  }

  componentDidMount() {
    prepareData('./data/songs.csv', this.state.metaProps, this.state.traits).then((res) => this.setState({
      isLoaded: true,
      data: res,
      songs: res.songs,
      selectedSongs: res.songs
    }));
  }

  render() {
    console.log(this.state)
    return (
      <div className="relative">
        <Waterfall
          songs={this.state.songs}
          selectedSongs={this.state.selectedSongs}
          updateSelectedSongs={songs => this.setState({selectedSongs: songs})}
          traits={this.state.traits}
          scales={this.state.data.scales}
          height={1000}
          width={600}
        />
        <Feature data={this.state.songs} selectedSongs={this.state.selectedSongs}/>
        <Median data={this.state.songs} selectedSongs={this.state.selectedSongs}/>
        <WhoComponent/>
      </div>
    );
  }
}

RootComponent.displayName = 'RootComponent';
export default RootComponent;
