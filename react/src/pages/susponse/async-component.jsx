import { lazy } from 'react';

export default function AsyncComponet(Component, api) {
  const promise = () =>
    new Promise(async (resolve) => {
      const data = await api();
      resolve({
        default: (props) => <Component data={data} {...props} />,
      });
    });

  return lazy(promise);
}
