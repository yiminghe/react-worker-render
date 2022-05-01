export default function render(this: any) {
  const { Div, Input } = this.nativeComponents;
  return (
    <>
      <Div>
        set(number):{' '}
        <Input
          onChange={this.getEventHandle('onChange')}
          value={this.state.count}
        />
      </Div>
      <Div
        style={{ border: '1px solid red', padding: 10, userSelect: 'none' }}
        onClick={this.getEventHandle('onClick')}
      >
        click to increment: {this.state.count}
      </Div>
    </>
  );
}
