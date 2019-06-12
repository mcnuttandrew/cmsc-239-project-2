import React, {Component} from 'react';

export default class Feature extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="feature-heading">
          <h1>Feature Component</h1>
        </div>
        <div className="feature">
          <div className="feature-chart"> *feature chart* </div>
          <div className="feature-checklist"> *checklist* </div>
        </div>
      </div>
    );
  }
}
