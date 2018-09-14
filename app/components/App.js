var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Nav = require('./Nav');
var Popular = require('./Popular');

// original way createClass() is deprecated new way is JS class
// This is the way you crteate a modern react component
class App extends React.Component {
  // render method returns the specific UI of component
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Route path="/popular" component={Popular} />
        </div>
      </Router>
    );
  }
}

// need to make sure we are exporting so index.js can recieve this component
module.exports = App;
