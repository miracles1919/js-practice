// 模拟实现一个finally

Promise.prototype.finally = function (callback) {
  return this.then(
    (value) => Promise.resolve(callback()).then(() => value),
    (err) =>
      Promise.resolve(callback()).then(() => {
        throw err;
      })
  );
};

let promise = new Promise(resolve => resolve('resolve'))

promise
  .then()
  .then((val) => {
    console.log('before finally:', val);
    // return val;
    return new Promise(resolve => setTimeout(() => resolve(val), 1000))
  })
  .finally((val) => {
    console.log('finally:', val);
  })
  .then((val) => {
    console.log('after finally:', val);
  });