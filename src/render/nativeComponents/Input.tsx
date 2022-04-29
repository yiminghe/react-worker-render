import { registerComponent } from '../../worker';
import React from 'react';

interface InputProps {
  value: string;
  seq: number;
  onChange: Function;
}

interface InputState {
  value: string;
  seq: number;
}

class Input extends React.Component<InputProps, InputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value,
      seq: props.seq || 1,
    };
  }
  getDerivedStateFromProps(nextProps: InputProps, prevState: InputState) {
    if (
      nextProps.seq === prevState.seq &&
      nextProps.value !== prevState.value
    ) {
      return {
        ...prevState,
        value: nextProps.value,
      };
    }
    return {};
  }
  onChange = (e: any) => {
    const { value } = e;
    const current = {
      value,
      seq: this.state.seq + 1,
    };
    this.setState(current);
    this.props.onChange(current);
  };
  render() {
    return <input value={this.state.value} onChange={this.onChange}></input>;
  }
}

export default registerComponent('input', {
  render() {
    return (
      <Input
        value={this.state.value}
        seq={this.state.seq}
        onChange={this.getNativeEventHandle('onChange')}
      />
    );
  },
});
