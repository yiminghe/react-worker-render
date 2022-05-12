export default function render(this: any) {
  const { Div } = this.nativeComponents;
  return (
    <Div
      id="t-title"
      style={{
        border: '1px solid red',
        padding: 10,
        margin: 10,
        userSelect: 'none',
      }}
      onClick={this.getEventHandle('refresh')}
    >
      {this.state.title}@{this.state.now}
    </Div>
  );
}
