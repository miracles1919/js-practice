import React, { Suspense } from 'react';
import AsyncComponent from './async-component';

const fakeGetData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'jiangjiang',
        habits: ['sleep', 'play'],
      });
    }, 1000);
  });
};

function Demo({ data, age }) {
  const { name, habits = [] } = data;

  return (
    <div>
      <div>{name}</div>
      <div>
        {habits.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div>{age}</div>
    </div>
  );
}

export default class Index extends React.Component {
  LazyDemo = AsyncComponent(Demo, fakeGetData);

  render() {
    const { LazyDemo } = this;

    return (
      <Suspense fallback={<div>loading</div>}>
        <LazyDemo age={2} />
      </Suspense>
    );
  }
}
