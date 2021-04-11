const PENDING = 'pending';
const RESOLVE = 'fullfiled';
const REJECT = 'rejected';

class ToyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  status = PENDING;
  value = undefined;
  err = undefined;
  succCbs = [];
  failCbs = [];

  static all = (arr) => {
    const result = [];
    let i = 0;

    return new ToyPromise((resolve, reject) => {
      const addData = (key, data) => {
        result[key] = data;
        i++;
        if (i === arr.length) {
          resolve(result);
        }
      };
      for (let i = 0; i < arr.length; i++) {
        const curr = arr[i];
        if (curr instanceof ToyPromise) {
          curr.then((val) => addData(i, val), reject);
        } else {
          addData(i, curr);
        }
      }
    });
  };

  static resolve = (value) => {
    if (value instanceof ToyPromise) return value;
    return new ToyPromise((resolve) => resolve(value));
  };

  resolve = (value) => {
    if (this.status !== PENDING) return;
    this.status = RESOLVE;
    this.value = value;

    while (this.succCbs.length) this.succCbs.shift()(this.value);
  };

  reject = (err) => {
    if (this.status !== PENDING) return;
    this.status = REJECT;
    this.err = err;

    while (this.failCbs.length) this.failCbs.shift()(this.err);
  };

  then = (success, fail) => {
    success = success ? success : (value) => value;
    fail = fail
      ? fail
      : (err) => {
          throw err;
        };
    return new ToyPromise((resolve, reject) => {
      switch (this.status) {
        case RESOLVE:
          this.resolveCallback(success, resolve, reject);
          break;
        case REJECT:
          this.rejectCallback(fail, resolve, reject);
          break;
        default:
          // pending
          this.succCbs.push(() =>
            this.resolveCallback(success, resolve, reject)
          );
          this.failCbs.push(() => this.rejectCallback(fail, resolve, reject));
          break;
      }
    });
  };

  catch = (cb) => this.then(null, cb)

  finally = (cb) =>
    this.then(
      (value) => ToyPromise.resolve(cb()).then(() => value),
      (err) =>
        ToyPromise.resolve(cb()).then(() => {
          throw err;
        })
    );

  resolvePromise(res, resolve, reject) {
    if (res instanceof ToyPromise) {
      // res.then((val) => resolve(val), (err) => reject(err));
      res.then(resolve, reject);
    } else {
      resolve(res);
    }
  }

  callback = (type) => (cb, resolve, reject) => {
    setTimeout(() => {
      try {
        let res = cb(type === 'success' ? this.value : this.err);
        this.resolvePromise(res, resolve, reject);
      } catch (e) {
        reject(e);
      }
    }, 0);
  };

  resolveCallback = this.callback('success');

  rejectCallback = this.callback('fail');
}

module.exports = ToyPromise;
