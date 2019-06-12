import React, {Component} from 'react';

export default class Median extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div>
        <div className="median-heading">
          <h1>Median Bar Chart Component</h1>
        </div>
        <div className="median">
          <div className="median-dropdown"> *dropdown* </div>
          <div className="median-chart"> *median chart* </div>
        </div>
      </div>
    );
  }
}
