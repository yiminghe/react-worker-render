import { registerComponent } from '../../render';

export default registerComponent('input', {
  getInitialState() {
    return {
      value: this.props.value,
    };
  },
  onChange(e: any) {
    // do not need send to render
    this.setState(e, false);
    this.props.onChange?.(e.value);
  },
  componentDidUpdate(prevProps: any, prevState: any) {
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
