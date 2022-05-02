export default function render(this: any) {
  const { Div, Input, Link, A } = this.nativeComponents;
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
      <Link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css"
      />
      <Div>
        <A
          className="github-fork-ribbon"
          href="https://github.com/yiminghe/react-worker-render"
          data-ribbon="Fork me on GitHub"
          title="Fork me on GitHub"
        >
          Fork me on GitHub
        </A>
      </Div>
    </>
  );
}
