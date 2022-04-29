import React from 'react';

export class Div extends React.Component<any> {
  onClick = () => {
    this.props.onClick?.();
  };
  render() {
    return (
      <div {...this.props} onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }
}
