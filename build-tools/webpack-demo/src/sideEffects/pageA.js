function util() {
  console.log('util')
}

function query() {
  console.log('query')
}

export default {
  util,
  query,

  // 不推荐写法
  // get() {
  //   console.log('get')
  // }
}