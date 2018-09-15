var axios = require('axios');

// append this to end of requests if the app is being limited by git
// i.e you are getting permission denied from github
var id = 'YOUR_CLIENT_ID'; // look up this on github
var sec = 'YOUR_SECRET_ID';
var params = '?client_id=' + id + '$client_secret' + sec; // only need this if app is being limited by requests

function getProfile(username) {
  // return axios.get('https://api.github.com/users/' + username + params) // only need this one to append params
  return axios
    .get('https://api.github.com/users/' + username + params)
    .then(function(user) {
      return user.data;
    });
}

function getRepos(username) {
  return axios.get(
    'https://api.github.com/users/' +
      username +
      '/repos' +
      params +
      '&per_page=100'
  );
}

function getStarCOunt(repos) {
  // reduce allows us to take an array an reduce it to a single value
  // so we are looking at all the repo data and reducing all the star counts to one value
  return repos.data.reduce(function(count, repo) {
    return count + repo.stargazers_count;
  }, 0); // start at 0
}

// algorithm to calculate who wins battle
function calculateScore(profile, repos) {
  var followers = preofile.followers;
  var totalStars = getStarCount(repos);

  return followers * 3 + totalStars;
}

// if there is any errors with api request
function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  // axios.all takes an array of promises then once those promises have been resolved
  // we asynchronously call these promises
  // its going to call a function and passes the array to that function
  return axios.all([getProfile(player), getRepos(player)]).then(function(data) {
    var profie = data[0];
    var repos = data[1];

    // return an object
    return {
      profile: profile,
      score: calculateScore(profile, repos)
    };
  });
}

// sprt players by who won
function sortPlayers(players) {
  // return a brand new array an player who is at 0 has higher score
  return players.sort(function(a, b) {
    return b.score - a.score;
  });
}

// exporting object from this file so that any time need to interact with an
// external API we'll have a bunch of methods we can call in order to do that
module.exports = {
  // inside of our Results page we contact battle, here we pass an array of the two players
  // and then it will return the information about the players and the winner
  battle: function(players) {
    return axios
      .all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },
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
