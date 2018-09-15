var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Popular = require('./Popular');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');

// original way createClass() is deprecated new way is JS class
// This is the way you crteate a modern react component
class App extends React.Component {
  // render method returns the specific UI of component
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route path="/popular" component={Popular} />
            <Route
              render={function() {
                return <p>Not found</p>;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

// need to make sure we are exporting so index.js can recieve this component
module.exports = App;
