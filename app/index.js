var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

// state
// lifecycle event
// UI - this is the only one we required every time

// original way createClass() is deprecated new way is JS class
// This is the way you crteate a modern react component
class App extends React.Component {
  // render method returns the specific UI of component
  render() {
    return <div>Hello React Training</div>;
  }
}

// First argument what we want to render
// Second where we want to render to - here it is the div with ID of 'app'
// To invoke a component we use - <App />
ReactDOM.render(<App />, document.getElementById('app'));
