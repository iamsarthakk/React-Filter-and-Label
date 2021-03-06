/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Home from 'containers/Home/Loadable';
import FilterComponent from '../../components/FilterComponent';
import LabelComponent from '../../components/LabelComponent';

export default function App() {

  return (
    <div>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/filter" component={FilterComponent} />
          <Route path="/label" component={LabelComponent} />
      </Switch>
      
    </div>
  );
}
