export default function render(this: any) {
  const { Div, Input } = this.nativeComponents;
  const Title = this.getComponent('title');
  return (
    <>
      <Title />
      <Div>
        set(number):{' '}
        <Input
          onChange={this.getEventHandle('onChange')}
          value={this.state.count}
        />
      </Div>
      <Div
        style={{
          border: '1px solid red',
          margin: 10,
          padding: 10,
          userSelect: 'none',
        }}
        onClick={this.getEventHandle('onClick')}
      >
        click to increment: {this.state.count}
      </Div>
    </>
  );
}
