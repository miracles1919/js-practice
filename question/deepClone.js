function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // const copy = Array.isArray(obj) ? [] : {}
  const copy = {};

  if (obj.constructor === Array) {
    copy = [];
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key]);
    }
  }

  return copy;
}

// 处理循环引用
function deepClone(obj, cache = []) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // 存在循环引用，直接返回
  const hit = cache.filter((item) => item.origin === obj)[0];
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};

  // 存储原始数据
  cache.push({
    origin: obj,
    copy,
  });

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key], cache);
    }
  }

  return copy;
}

// 递归改循环
function deepClone(obj) {
  const copy = {};

  const stack = [
    {
      parent: copy,
      data: obj,
      key: undefined,
    },
  ];

  // 深度优先
  while (stack.length) {
    const node = stack.pop();
    const data = node.data;
    const parent = node.parent;
    const key = node.key;

    // 初始化赋值目标，key为undefined时拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (key !== undefined) {
      res = parent[key] = {};
    }

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] !== 'object') {
          res[key] = data[key];
        } else {
          stack.push({
            parent: res,
            key: key,
            data: data[key],
          });
        }
      }
    }
  }

  return copy;
}

// 循环版本 处理循环引用
function deepClone(obj) {
  const copy = {};
  const cache = [];

  const stack = [
    {
      parent: copy,
      data: obj,
      key: undefined,
    },
  ];

  // 深度优先
  while (stack.length) {
    const node = stack.pop();
    const data = node.data;
    const parent = node.parent;
    const key = node.key;

    let res = parent;
    if (key !== undefined) {
      res = parent[key] = {};
    }

    const hit = cache.filter((item) => item.origin === data)[0];
    if (hit) {
      res[key] = hit.copy
      break
    }

    cache.push({
      origin: data,
      copy: res,
    });

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] !== 'object') {
          res[key] = data[key];
        } else {
          stack.push({
            parent: res,
            key: key,
            data: data[key],
          });
        }
      }
    }
  }

  return copy;
}

// var obj = { x: 1, y: { z: 1 } };
var obj = { y: 1 };
var obj2 = { z: obj };
obj.x = obj2;
deepClone(obj);
