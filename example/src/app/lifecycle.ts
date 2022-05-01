export default {
  getInitialState() {
    return {
      count: 1,
    };
  },
  onChange(value: string) {
    const n = parseInt(value);
    if (typeof n === 'number' && !isNaN(n)) {
      this.setState({
        count: n,
      });
    }
  },
  onClick() {
    this.setState({
      count: this.state.count + 1,
    });
  },
} as any;
