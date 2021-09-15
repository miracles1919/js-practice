import React, { useMemo, useState } from 'react';
import './index.scss';

/* 获取随机颜色 */
function getColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return 'rgba(' + r + ',' + g + ',' + b + ',0.8)';
}

/* 获取随机位置 */
function getPostion(position) {
  const { width, height } = position;
  return {
    left: Math.ceil(Math.random() * width) + 'px',
    top: Math.ceil(Math.random() * height) + 'px',
  };
}

/* 色块组件 */
function Circle({ position }) {
  const style = useMemo(() => {
    return {
      background: getColor(),
      ...getPostion(position),
    };
  }, []);
  return <div style={style} className='circle' />;
}

class Index extends React.Component {
  state = {
    dataList: [], // 数据源列表
    renderList: [], // 渲染列表
    position: { width: 0, height: 0 }, // 位置信息
  };
  box = React.createRef();
  componentDidMount() {
    const { offsetHeight, offsetWidth } = this.box.current;
    const originList = new Array(20000).fill(1);
    this.setState({
      position: { height: offsetHeight, width: offsetWidth },
      dataList: originList,
      renderList: originList,
    });
  }
  render() {
    const { renderList, position } = this.state;
    console.log(renderList);
    return (
      <div className='bigData_index' ref={this.box}>
        {renderList.map((item, index) => (
          <Circle position={position} key={index} />
        ))}
      </div>
    );
  }
}

/* 控制展示Index */
export default () => {
  const [show, setShow] = useState(false);
  const [btnShow, setBtnShow] = useState(true);
  const handleClick = () => {
    setBtnShow(false);
    setTimeout(() => {
      setShow(true);
    }, []);
  };
  return (
    <div>
      {btnShow && <button onClick={handleClick}>show</button>}
      {show && <Index />}
    </div>
  );
};
