var React = require('react');
// React has two different components for creating anchor elements
//var Link = require('react-router-dom').Link; // absolute fundamentals you need to render an anchor tag
var NavLink = require('react-router-dom').NavLink; // this exists if you want to dynamically style the anchor link if that route is active

function Nav() {
  return (
    <ul className="nav">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/battle">
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/popular">
          Popular
        </NavLink>
      </li>
    </ul>
  );
}

module.exports = Nav;
