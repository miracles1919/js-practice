import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Admin from './page1';
import User from './page2';

export default () => (
  <Router>
    <Link to='admin'>admin</Link>{' '}
    <Link to='user'>user</Link>
    <Route path='/admin' component={Admin} />
    <Route path='/user' component={User} />
  </Router>
);
