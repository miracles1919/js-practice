import React, { useRef, useState } from 'react';

export default function Index() {
  const [num, setNum] = useState(1);
  const data = useRef(1);

  const handleClick = () => {
    setNum(num + 1);
    data.current += 1;
    // - - - - - - -
    setNum(num + 1);
    data.current += 1;
  };

  return (
    <div>
      <div>num: {num}</div>
      <div>ref: {data.current}</div>
      <button onClick={handleClick}>点击</button>
    </div>
  );
}
