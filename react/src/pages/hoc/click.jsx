import React, { useRef, useEffect } from 'react';

export default function ClickHoc(Component) {
  return function Wrap(props) {
    const dom = useRef({});

    useEffect(() => {
      const handerClick = () => console.log('发生点击事件');
      dom.current.addEventListener('click', handerClick);
      return () => dom.current.removeEventListener('click', handerClick)
    }, []);

    return (
      <div ref={dom}>
        <Component {...props} />
      </div>
    );
  };
}
