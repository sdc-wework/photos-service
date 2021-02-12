import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PhotosSlider from './components/photos-slider';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/buildings/1" />
      </Route>
      <Route path="/buildings/:workspaceId">
        <PhotosSlider />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('photos-slider')
);
