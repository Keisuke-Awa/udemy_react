import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import SearchPage from './SearchPage';
import About from './About';

const App = () => (
  <Router>
    <div className="app">
      <ul className="left-navi">
        <li><Link to="/">ホテル検索</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={SearchPage} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  </Router>
);

// setStateはstateを更新し、renderを再度呼ぶ機能をもつ
// ツーウェイバインディング
export default App;
