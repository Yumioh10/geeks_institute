const gameInfo = [
 {
   username: "john",
   team: "red",
   score: 5,
   items: ["ball", "book", "pen"]
 },
 {
   username: "becky",
   team: "blue",
   score: 10,
   items: ["tape", "backpack", "pen"]
 },
 {
   username: "susy",
   team: "red",
   score: 55,
   items: ["ball", "eraser", "pen"]
 },
 {
   username: "tyson",
   team: "green",
   score: 1,
   items: ["book", "pen"]
 },
];

/* 1. Create an array using forEach that contains all the usernames from the gameInfo array, add an exclamation point (ie. “!”) to the end of every username.*/
const usernames = [];

gameInfo.forEach(player => {
  // Add the username with an exclamation point to the new array
  usernames.push(player.username + "!");
});

console.log(usernames);

/* 2. Create an array using forEach that contains the usernames of all players with a score bigger than 5.*/
const winners = [];

gameInfo.forEach(player => {
  // Check if the player's score is greater than 5
  if (player.score > 5) {
    // If true, push the username to the winners array
    winners.push(player.username);
  }
});

console.log(winners);

/* 3. Calculate and Display the Total Score */
let totalScore = 0;

gameInfo.forEach(player => {
  // Add the current player's score to the totalScore variable
  totalScore += player.score;
});

console.log("The total score of the users is: " + totalScore);
