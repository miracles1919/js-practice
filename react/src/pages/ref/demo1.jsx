import React, { forwardRef } from 'react';

function Son({ grandRef }) {
  return (
    <div>
      <div>hellw</div>
      <div ref={grandRef}>world</div>
    </div>
  );
}

class Father extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Son grandRef={this.props.grandRef} />
      </div>
    );
  }
}

const ForwardRefComponent = forwardRef((props, ref) => (
  <Father {...props} grandRef={ref} />
));

export default class GrandFather extends React.Component {
  constructor(props) {
    super(props);
  }

  node = null;

  componentDidMount() {
    console.log(this.node);
  }

  render() {
    return (
      <div>
        <ForwardRefComponent ref={(node) => (this.node = node)} />
      </div>
    );
  }
}
