export default {
  defaultProps: {
    defaultId: 1,
  },
  getInitialState() {
    return {
      now: this.props.defaultId,
    };
  },
  refresh() {
    this.setState({
      now: Date.now(),
    });
  },
} as any;
