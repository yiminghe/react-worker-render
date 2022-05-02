export default {
  defaultProps: {
    defaultId: 1,
  },
  getInitialState() {
    return {
      title: 'react-worker-render',
      now: this.props.defaultId,
    };
  },
  refresh() {
    this.setState({
      now: Date.now(),
    });
  },
} as any;
