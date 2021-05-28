import React, { useState } from 'react';

export default function Diff() {
  const [num, setNum] = useState(0);

  // 单节点diff
  const a1 = (
    <div>
      <div>a</div>
    </div>
  );
  const b1 = (
    <div>
      <div>b 1</div>
      <div>b 2</div>
    </div>
  );

  const a2 = <div>a</div>;
  const b2 = <p>b</p>;

  const a3 = <div key='a3'>a</div>;
  const b3 = <div key='b3'>b</div>;

  // 多节点diff
  const a4 = (
    <ul>
      <li key="a">a</li>
      <li key="b">b</li>
      <li key="c">c</li>
    </ul>
  );
  const b4 = (
    <ul>
      <li key="a">a</li>
      <li key="c">b</li>
      <li key="b">c</li>
    </ul>
  )

  const a5 = (
    <ul>
      <li key="a">a</li>
      <li key="b">b</li>
      <li key="c">c</li>
    </ul>
  );
  const b5 = (
    <ul>
      <li key="a">a</li>
      <p key="b">b</p>
      <li key="c">c</li>
    </ul>
  )

  const a6 = (
    <ul>
      <li key="a">a</li>
      <li key="b">b</li>
      <li key="c">c</li>
      <li key="d">d</li>
    </ul>
  );
  const b6 = (
    <ul>
      <li key="a">a</li>
      <li key="c">c</li>
      <li key="d">d</li>
      <li key="b">b</li>
    </ul>
  );

  const a7 = (
    <ul>
      <li key="a">a</li>
      <li key="b">b</li>
      <li key="c">c</li>
      <li key="d">d</li>
    </ul>
  );
  const b7 = (
    <ul>
      <li key="d">d</li>
      <li key="a">a</li>
      <li key="b">b</li>
      <li key="c">c</li>
    </ul>
  );

  return <div onClick={() => setNum(num + 1)}>{num % 2 === 0 ? a7 : b7}</div>;
}
