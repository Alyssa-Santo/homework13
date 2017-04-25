var friends = require("../data/friends.js");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
      res.json(friends);
  });

  app.post("/api/friends", function(req, res){

// console.log('the following is data from the friends variable');
// console.log(friends[0].scores[0]);

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    //Resulsts of the users survery
    var userData = req.body;
    var userScores = userData['scores[]'];
    // console.log(userScores);
    var userTotalScore = 0;

    // calculate user Total Score
    for(var i = 0; i < userScores.length; i++){
      userTotalScore += parseInt(userScores[i]);
    }

    console.log('the total number of the user input is ' + userTotalScore);

    // calculate each Final Number for each friend

    // keep in mind these numbers correspond to a friend, so the 1st number is the 1st friend
    var friendsNumberArray = [];

    var currentNumber = 0;

    //This will calculate the difference between the scores of the users
    var totalDifference = 0;

    //Loop to go through all of the people and the differences
    for (var i = 0; i < friends.length; i++) {
      

      //Loop throug the scores of each person
      for (var j = 0; j < friends[i].scores.length; j++) {

          //console.log(friends[i].scores[j]);

          // if we're starting all over, AKA on the next iteration of the loop, reset the currentNumber value
         if(j === 0){
            currentNumber = 0;
         }

          currentNumber += parseInt(friends[i].scores[j]);

          // asking if we're on the last number of the loop, thus we added them all
          // if we added them add, then we want to push that to an array
          if(j === friends[i].scores.length-1){
            friendsNumberArray.push(currentNumber);
            //console.log(friendsNumberArray);
          }
//        
      }

    }

    // We want to calculate the differences and find the smallest number

    // we set the default to user number - first number in the array

    // this will hold all the differences, use this to compare indexes to find which Friend is most compatible
    var differeceArray = [];

    var smallestDifference = Math.abs(userTotalScore - friendsNumberArray[0]);
    differeceArray.push(smallestDifference);
    console.log(smallestDifference);

    // check to see if the second and third number differences are smaller or not

    for(var k = 1; k < friendsNumberArray.length; k++){
      var difference = Math.abs(userTotalScore - friendsNumberArray[k]);
      differeceArray.push(difference);
      console.log(difference);

      if(difference < smallestDifference){
          smallestDifference = difference;
      }
    }

    console.log('the smallest difference is ' + smallestDifference);
    console.log('the index of the smallest different is ' + differeceArray.indexOf(smallestDifference));
    console.log('You are the most compatible with....' + friends[differeceArray.indexOf(smallestDifference)].name + '!')


    var compatibleName = friends[differeceArray.indexOf(smallestDifference)].name;
    var compatiblePicture = friends[differeceArray.indexOf(smallestDifference)].photo;
    var compatibleDifference = smallestDifference;

    bestMatch.name = compatibleName;
    bestMatch.photo = compatiblePicture;
    bestMatch.friendDifference = compatibleDifference;
    

    res.json(bestMatch);
  });

}
