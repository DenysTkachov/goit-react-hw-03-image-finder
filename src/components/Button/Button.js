import React from 'react';
import '../../index.css'

export class Button extends React.Component {
  render() {
    const { onClick } = this.props;

    return (
      <button className="Button" type="button" onClick={onClick}>
        Load More
      </button>
    );
  }
}
