import React, { createContext, useState, useEffect } from 'react';
import Router from './router';

export const Permission = createContext([]);

const fakeGetPermissionApi = () =>
  new Promise((reslove) => {
    setTimeout(() => {
      reslove(['admin', 'pay']);
    }, 200);
  });

function NoPermission() {
  return <div>您暂时没有权限，请联系管理员开通权限！</div>;
}

export function PermissionHoc(auth) {
  const matchPermission = (auth, permission) => {
    return permission.indexOf(auth) !== -1;
  };
  return function (Component) {
    return function (props) {
      return (
        <Permission.Consumer>
          {(permission) =>
            matchPermission(auth, permission) ? (
              <Component {...props} />
            ) : (
              <NoPermission />
            )
          }
        </Permission.Consumer>
      );
    };
  };
}

export default function Index() {
  const [permission, setPermission] = useState([]);

  useEffect(() => {
    fakeGetPermissionApi().then((data) => {
      setPermission(data);
    });
  }, []);

  return (
    <Permission.Provider value={permission}>
      <Router />
    </Permission.Provider>
  );
}
