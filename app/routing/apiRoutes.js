var friends = require("../data/friends");
// console.log(friends);

module.exports = function(app) {
  // API GET Requests
  // ---------------------------------------- //
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
// console.log(friends);
  // API POST Requests
  // ---------------------------------------- //
  app.post("/api/new", function(req, res) {
    findFriend(req.body, function(match) {
      // Push this only after making a match — otherwise, the friend
      // will match with itself, So we created our own callback.
      friends.push(req.body);
      res.json(match);
    });
  });
}; // end export

function findFriend(currentFriend, callback) {
  // Convert string score values to integers.
  var currentFriendScores = currentFriend.scores.map(function(x) {
    return parseInt(x, 10);
  });

  var previousTotalDifference = 1000;
  var match;

  for (var i = 0; i < friends.slice(0,5).length; i++) {
    var totalDifference = 0;
    for (var j = 0; j < friends[i].scores.length; j++) {
      totalDifference += Math.abs(friends[i].scores[j] - currentFriendScores[j]);
    }
    console.log(totalDifference);
    if (totalDifference < previousTotalDifference) {
      previousTotalDifference = totalDifference;
      match = friends[i];
    }
  }

  console.log("The match is " + match.name);
  callback(match);
  return match;
}