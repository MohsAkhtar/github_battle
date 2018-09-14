var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

// because we are not using this anywhere else we dont need to make a seperate file for this component
// also it is a 'stateless functional component' so we can just pass in props from the outside state
function SelectLanguage(props) {
  // onClick={this.updateLanguage.bind(null, language)}, notice on bind we pass in null. This is because it already knows context
  // remember first argument is always context any argument after this are the ones passed in to the new function

  // list of languages
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="languages">
      {languages.map(function(language) {
        return (
          <li
            style={
              language === props.selectedLanguage ? { color: '#d0021b' } : null
            }
            onClick={props.onSelect.bind(null, language)}
            key={language}
          >
            {language}
          </li>
        );
      }, this)}
    </ul>
  );
}

function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map(function(repo, index) {
        return (
          <li key={repo.name} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
                >
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

// Remember we always need prop types
SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

class Popular extends React.Component {
  // always have super with constructor passing it props
  constructor(props) {
    super(props);
    // 'this.state' is the way to set state on a specific component
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    // we don't know what 'this' will be bound to till updateLanguage is invoked
    // what we're doing here is binding 'this' keyword to 'this.updateLanguage'
    // so no matter what context 'updateLanguage' is called its going to be called
    // with the correct 'this' keyword. Remember 'bind' creates a new function.
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    // AJAX requests made here
    this.updateLanguage(this.state.selectedLanguage);
  }

  // updates state with what language was selected
  updateLanguage(language) {
    this.setState(function() {
      // so selected language becomes whatever we pass it
      // whenever invoked we set repos back to null so it can update
      return {
        selectedLanguage: language,
        repos: null
      };
    });
    // everytime a new functioon is invoked the this has a different context
    // so we bind 'this' at the end so the context is the same as what it is outside
    api.fetchPopularRepos(language).then(
      function(repos) {
        //update state of repos with selected language
        this.setState(function() {
          return {
            repos: repos
          };
        });
      }.bind(this)
    );
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos ? (
          <p>LOADING</p>
        ) : (
          <RepoGrid repos={this.state.repos} />
        )}
      </div>
    );
  }
}

module.exports = Popular;
