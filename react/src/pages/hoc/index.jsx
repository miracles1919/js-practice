import React from 'react';
import ClickHoc from './click'

// 属性代理
function HOC(Component) {
  return class WrapComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        name: 'jiangjiang',
      };
    }
    render = () => <Component {...this.props} {...this.state} />;
  };
}

// 反向继承
function HOC2(Component) {
  return class WrapComponent extends Component {
    render() {
      return <div>super render: {super.render()}</div>;
    }
  };
}

@ClickHoc
@HOC
export default class Index extends React.Component {
  say() {
    const { name } = this.props;
    console.log(name);
  }
  render() {
    return (
      <div>
        hello,world <button onClick={this.say.bind(this)}>点击</button>
      </div>
    );
  }
}

@HOC2
export class Index2 extends React.Component {
  render() {
    return <div>hello,world</div>;
  }
}
