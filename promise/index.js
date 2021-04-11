const ToyPromise = require('./promise');

let promise = new Promise(
  // (resolve, reject) => setTimeout(() => resolve('resolve'), 1000)
  (resolve) => resolve('resolve')
);

let promise2 = new ToyPromise(
  (resolve, reject) =>
    // { throw new Error('executor err') }
    setTimeout(() => resolve('resolve'), 1000)
  // resolve('resolve')
  // reject('reject')
);

// promise.then((val) => console.log(val));
promise.then((val) => val).then((val) => console.log(val));
promise
  .then()
  .then((val) => {
    console.log('before finally:', val);
    // return val;
    return new Promise((resolve) => setTimeout(() => resolve(val), 3000));
  })
  .finally((val) => {
    console.log('finally:', val);
  })
  .then((val) => {
    console.log('after finally:', val);
  });

promise2
  .then()
  .then(
    // (val) => console.log('Toy:', val),
    (val) => {
      console.log('Toy:', val);
      return new ToyPromise((resolve) => setTimeout(() => resolve(1026), 3000));
    },
    // (val) => {
    //   throw new Error('then err');
    // },
    // (val) => new ToyPromise((resolve) => resolve('other')),
    (err) => console.log('Toy:', err)
  )
  .finally((val) => {
    console.log('Toy finally:', val);
  })
  .then((val) => console.log('Toy after finally:', val));

// .catch((err) => console.log('Toy:', err));

// promise2.then(
//   (val) => console.log('Toy:', val),
//   (err) => console.log('Toy:', err)
// );

ToyPromise.all(['a', 'b', promise2, 'c']).then((result) => {
  console.log(result);
});

ToyPromise.resolve('aa').then((val) => console.log('Toy.resolve:', val));
ToyPromise.resolve(promise2).then((val) => console.log('Toy.resolve:', val));

new ToyPromise((resolve, reject) => reject('Toy reject'))
  .then((val) => console.log(val))
  .catch((err) => console.log('---end---', err));
