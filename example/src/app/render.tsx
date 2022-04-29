export default function render(this: any) {
  const { Div } = this.nativeComponents;
  return (
    <Div
      style={{ border: '1px solid red', padding: 10, userSelect: 'none' }}
      onClick={this.getNativeEventHandle('onClick')}
    >
      click to increment: {this.state.count}
    </Div>
  );
}
