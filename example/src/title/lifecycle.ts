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
  shouldComponentUpdate(nextProps: any, nextState: any) {
    return nextState.now !== this.state.now;
  },
  refresh() {
    this.setState({
      now: Date.now(),
    });
  },
} as any;
