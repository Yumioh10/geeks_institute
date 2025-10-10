// 1. Create a variable called sentence
const sentence = "The movie is not that bad, I like it";

// 2. Create a variable called wordNot
const wordNot = sentence.indexOf("not");

// 3. Create a variable called wordBad
const wordBad = sentence.indexOf("bad");
console.log(`'not' starts at index: ${wordNot}`);
console.log(`'bad' starts at index: ${wordBad}`);

// 4/5
if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
  const firstPart = sentence.slice(0, wordNot);
  const endOfBad = wordBad + 3;
  const lastPart = sentence.slice(endOfBad);
  const newSentence = firstPart + "good" + lastPart;
console.log(newSentence);
} else {
  console.log(sentence);
}