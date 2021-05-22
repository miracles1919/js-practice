function co(gen) {
  let ctx = this

  return new Promise((resolve, reject) => {
    if (typeof gen === 'function') gen = gen.call(ctx)

    if (!gen || typeof gen.next !== 'function') return resolve(gen)

    onFulffilled()
    function onFulffilled(res) {
      let ret
      try {
        ret = gen.next(res)
      } catch (e) {
        return reject(e)
      }
      next(ret)
    }

    function next(res) {
      if (res.done) return resolve(res.value)
      // res.value.then(onFulffilled)
      Promise.resolve(res.value).then(onFulffilled)
    }
  })
}

co(function*(){
  const res1 = yield Promise.resolve({ a: 1 })
  console.log(res1)
  const res2 = yield Promise.resolve({ a: 2 })
  console.log(res2)
})