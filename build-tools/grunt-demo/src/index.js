const promise = new Promise(resolve => {
  setTimeout(() => resolve(), 1000)
})

const sleep = async () => {
  await promise()
}

sleep()