var friends = require("../data/friends.js");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
      res.json(friends);
  });

  app.post("/api/friends", function(req, res){

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    //Resulsts of the users survery
    var userData = req.body;
    var userScores = userData.scores;

    //This will calculate the difference between the scores of the users
    var totalDifference = 0;

    //Loop to go through all of the people and the differences
    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].name);
      totalDifference = 0;

      //Loop throug the scores of each person
      for (var j = 0; j < friends[i].scores[j]; j++) {
        console.log("NEEDS TO KEEP GOING!");
        //Calculate the differnce between the scores and the sum
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
        console.log("HERE WE ARE!");
        //if statement to show who the best match is
        if (totalDifference <= bestMatch.friendDifference) {
console.log("YAY!");
          //reset best match
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }

    //Save the users information to a database
    friends.push(userData);

    res.json(bestMatch);
  });

}
