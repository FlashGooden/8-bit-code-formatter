const readline = require("readline");
const formatter = require("./8-bit-text-formatter.js");
const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
   prompt: "Formatter> ",
});
rl.prompt();
function askQuestion() {
   rl.question(
      "What would you like to do?\n\n 1. Encode a string \n 2. Decode a set of strings \n 3. Exit \n\n",
      (answer) => {
         if (answer === "1") {
            rl.question(
               "Please enter the string you want to encode \n",
               (answer) => {
                  encodeAnswer(answer);
                  askQuestion();
               }
            );
         }

         if (answer === "2") {
            rl.question(
               "Please enter the string of numbers seperated by spaces that you want to decode \n",
               (answer) => {
                  decodeAnswer(answer);
                  askQuestion();
               }
            );
         }
      }
   );
}
//The function used to encode the answer on the command line
function encodeAnswer(answer) {
   console.log("Thank you for using the text formatter \n");
   console.log("Your encoded return is \n");
   console.log(new formatter.ASentenceEncoder(answer).splitWord());
}
//the function used to decode a set of numbers on the command line
function decodeAnswer(answer) {
   console.log("Thank you for using the text formatter \n");
   console.log("Your decoded return is \n");
   console.log(
      new formatter.ASentenceDecoder(
         answer.trim().split(" ")
      ).decodeEachDecimal()
   );
}

askQuestion();
// rl.prompt();
