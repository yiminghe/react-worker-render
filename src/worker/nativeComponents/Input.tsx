import { registerComponent } from '../../render';

export default registerComponent('input', {
  getInitialState() {
    return {
      value: this.props.value,
      seq: 1,
    };
  },
  onChange(e: any) {
    // do not need send to render
    this.setState(e, false);
    this.props.onChange?.(e.value);
  },
  componentDidUpdate(prevProps: any, prevState: any) {
    if (Number.isNaN(this.props.value) && Number.isNaN(this.state.value)) {
      return;
    }
    if (this.props.value !== this.state.value) {
      this.setState({
        ...this.state,
        value: this.props.value,
      });
    }
  },
  render() {
    return null;
  },
});
