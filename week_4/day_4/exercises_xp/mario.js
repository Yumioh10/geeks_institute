const marioGame = {
  detail : "An amazing game!",
  characters : {
      mario : {
        description:"Small and jumpy. Likes princesses.",
        height: 10,
        weight: 3,
        speed: 12,
      },
      bowser : {
        description: "Big and green, Hates princesses.",
        height: 16,
        weight: 6,
        speed: 4,
      },
      princessPeach : {
        description: "Beautiful princess.",
        height: 12,
        weight: 2,
        speed: 2,
      }
  },
}
/* 1. Convert this JS object into a JSON object. What happens to the nested objects ? */
let jsonMarioGame = JSON.stringify(marioGame);
console.log(jsonMarioGame);

/* The nested objects (mario, bowser, and princessPeach within the characters object) are also converted into a single, continuous JSON string.
They are represented in JSON syntax (keys are enclosed in double quotes and values are separated by commas).
The entire JSON output is a single string with no line breaks or indentation, which is the default format for JSON.stringify().*/

/* 2.Convert and pretty print this JS object into a JSON object.*/
const prettyJsonMarioGame = JSON.stringify(marioGame, null, 2);
console.log(prettyJsonMarioGame);

/* 3. Use your web inspector to add a breakpoint. Check the values of the JSON object in the debugger.*/
