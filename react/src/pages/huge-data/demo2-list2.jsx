import { useState, useRef, useEffect } from 'react';
import './index.scss';

export default function VirtualList() {
  const [dataList, setDataList] = useState([]); /* 保存数据源 */
  const [position, setPosition] = useState([
    0, 0,
  ]); /* 截取缓冲区 + 视图区索引 */
  const scroll = useRef(null); /* 获取scroll元素 */
  const box = useRef(null); /* 获取元素用于容器高度 */
  const context = useRef(null); /* 用于移动视图区域，形成滑动效果。 */
  const scrollInfo = useRef({
    height: 500 /* 容器高度 */,
    bufferCount: 8 /* 缓冲区个数 */,
    itemHeight: 60 /* item高度 */,
    renderCount: 0 /* 渲染个数 */,
  });

  useEffect(() => {
    const height = box.current.offsetHeight;
    const { itemHeight, bufferCount } = scrollInfo.current;
    const renderCount = Math.ceil(height / itemHeight) + bufferCount;
    // console.log(renderCount);
    scrollInfo.current = { renderCount, height, bufferCount, itemHeight };
    const dataList = new Array(10000).fill(1).map((_, i) => i);
    setDataList(dataList);
    setPosition([0, renderCount]);
  }, []);

  const handleScroll = () => {
    const { scrollTop } = box.current;
    const { itemHeight, renderCount, bufferCount, endOffset } =
      scrollInfo.current;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const bufferIndex = startIndex - bufferCount / 2;
    const currentOffset = bufferIndex >= 0 ? bufferIndex * itemHeight : 0;

    context.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`; /* 偏移，造成下滑效果 */

    const start = bufferIndex >= 0 ? bufferIndex : 0;
    const end = start + renderCount + 1;

    if (end !== position[1] || start !== position[0]) {
      /* 如果render内容发生改变，那么截取  */
      setPosition([start, end]);
    }
  };

  const { itemHeight, height } = scrollInfo.current;
  const [start, end] = position;
  const renderList = dataList.slice(start, end);
  console.log('渲染区间', position);

  return (
    <div className='list_box' ref={box} onScroll={handleScroll}>
      <div
        className='scroll_box'
        style={{ height: `${height}px` }}
        ref={scroll}
        onScroll={handleScroll}
      >
        <div
          className='scroll_hold'
          style={{ height: `${dataList.length * itemHeight}px` }}
        />
        <div className='context' ref={context}>
          {renderList.map((item, i) => (
            <div className='list' key={i}>
              {item + ''} Item
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
