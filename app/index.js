var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');
var App = require('./components/App'); // remember App is what was exported from App.js

// state
// lifecycle event
// UI - this is the only one we required every time

// First argument what we want to render
// Second where we want to render to - here it is the div with ID of 'app'
// To invoke a component we use - <App />
ReactDOM.render(<App />, document.getElementById('app'));
