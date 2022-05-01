export default function render(this: any) {
  const { Div } = this.nativeComponents;
  return (
    <Div
      style={{
        border: '1px solid red',
        padding: 10,
        margin: 10,
        userSelect: 'none',
      }}
      onClick={this.getEventHandle('refresh')}
    >
      react-worker-render@{this.state.now}
    </Div>
  );
}
