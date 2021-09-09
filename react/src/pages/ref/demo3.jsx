import React, { forwardRef, useRef, useEffect } from 'react';

class Son extends React.PureComponent {
  state = {
    fatherMes: '',
  };

  handleFatherMes = (fatherMes) => this.setState({ fatherMes });

  render() {
    const { fatherMes, sonMes } = this.state;
    return (
      <div>
        <div>fatherMes: {fatherMes}</div>
      </div>
    );
  }
}

export default function Father() {
  const sonInst = useRef(null);

  return (
    <div>
      <Son ref={sonInst} />
      <input
        onChange={(e) => sonInst.current.handleFatherMes(e.target.value)}
      />
    </div>
  );
}
