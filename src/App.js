import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Index from 'pages/index';
import Post from 'pages/post';

import ScrollToTop from 'components/scroll-to-top';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <ScrollToTop>
          <Switch>
            <Route path="/post/:tag" component={Post} />
            <Route path="/" component={Index} />
          </Switch>
        </ScrollToTop>
      </HashRouter>
    </div>
  );
}

export default App;
