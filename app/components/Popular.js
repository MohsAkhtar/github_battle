var React = require('react');

class Popular extends React.Component {
  // always have super with constructor passing it props
  constructor(props) {
    super(props);
    // 'this.state' is the way to set state on a specific component
    this.state = {
      selectedLanguage: 'All'
    };

    // we don't know what 'this' will be bound to till updateLanguage is invoked
    // what we're doing here is binding 'this' keyword to 'this.updateLanguage'
    // so no matter what context 'updateLanguage' is called its going to be called
    // with the correct 'this' keyword. Remember 'bind' creates a new function.
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  // updates state with what language was selected
  updateLanguage(language) {
    this.setState(function() {
      // so selected language becomes whatever we pass it
      return {
        selectedLanguage: language
      };
    });
  }

  render() {
    // list of languages
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    // onClick={this.updateLanguage.bind(null, language)}, notice on bind we pass in null. This is because it already knows context
    // remember first argument is always context any argument after this are the ones passed in to the new function
    return (
      <div>
        <ul className="languages">
          {languages.map(function(language) {
            return (
              <li
                style={
                  language === this.state.selectedLanguage
                    ? { color: '#d0021b' }
                    : null
                }
                onClick={this.updateLanguage.bind(null, language)}
                key={language}
              >
                {language}
              </li>
            );
          }, this)}
        </ul>
      </div>
    );
  }
}

module.exports = Popular;
