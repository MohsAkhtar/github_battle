var axios = require('axios');

// exporting object from this file so that any time need to interact with an
// external API we'll have a bunch of methods we can call in order to do that
module.exports = {
  fetchPopularRepos: function(language) {
    // encodeURI
    var encodedURI = window.encodeURI(
      'https://api.github.com/search/repositories?q=stars:>1+language:' +
        language +
        '&sort=stars&order=desc&type=Repositories'
    );

    // promise, function only invokes when the request to the github URL has resolved
    return axios.get(encodedURI).then(function(response) {
      return response.data.items;
    });
  }
};
