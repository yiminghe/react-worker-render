export default {
  getInitialState() {
    return {
      count: 1,
    };
  },
  onClick() {
    this.setState({
      count: this.state.count + 1,
    });
  },
} as any;
