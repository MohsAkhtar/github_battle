var React = require('react');
var Popular = require('./Popular');

// original way createClass() is deprecated new way is JS class
// This is the way you crteate a modern react component
class App extends React.Component {
  // render method returns the specific UI of component
  render() {
    return (
      <div className="container">
        <Popular />
      </div>
    );
  }
}

// need to make sure we are exporting so index.js can recieve this component
module.exports = App;
