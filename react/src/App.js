import React from 'react';
// import Diff from './pages/Diff'
// import Hooks from './pages/Hooks'
import Hooks from './demo/hooks/app'

class App extends React.Component {

  state = {}

  componentDidMount() {
    console.log('did mount')
    this.setState({ name: 'name' }, () => {
      console.log('this setState callback')
    })
  }

  render() {
    return (
      <div>
        {/* app */}
        <Hooks />
      </div>
    )
  }
}

export default App