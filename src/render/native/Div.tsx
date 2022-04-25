import React from 'react';

export class Div extends React.Component<any> {
  render() {
    return <div {...this.props}>{this.props.children}</div>;
  }
}
