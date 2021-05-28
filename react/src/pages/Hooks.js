import React, { useState } from 'react'

const Hooks = () => {

  const [num, setNum] = useState(0)
  const [num2, setNum2] = useState(2)

  // setNum(num + 1)

  const onClick = () => {
    setNum(num + 1)
    // setNum(0)
    setNum2(num2 * 2)
  }

  return (<div onClick={onClick}>{num}, {num2}</div>)

}

export default Hooks