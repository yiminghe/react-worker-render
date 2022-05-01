export default {
  getInitialState() {
    return {
      now: Date.now(),
    };
  },
  refresh() {
    this.setState({
      now: Date.now(),
    });
  },
} as any;
