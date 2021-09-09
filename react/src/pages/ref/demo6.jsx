import React from 'react';

export default class Index extends React.Component {
  state = {
    num: 1
  }

  node = null

  render() {

    const { num } = this.state
    return (
      // <div ref={node => {
      //   this.node = node
      //   console.log(this.node)
      // }}>
      <div ref="node">
        <div>num: {num}</div>
        <button onClick={() => this.setState({ num: num + 1 })}>点击</button>
      </div>
    );
  }
}
