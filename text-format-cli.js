const readline = require("readline");
const formatter = require('./8-bit-text-formatter.js')
const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
   prompt: "Formatter> ",
});

rl.question(
   "What would you like to do?\n\n 1. Encode a string \n 2. Decode a set of strings \n\n",
   (answer) => {
      rl.prompt();
      rl.on("line", (line) => {
         switch (line.trim()) {
            case "hello":
               console.log("world!");
               break;
            default:
               console.log(`Say what? I might have heard '${line.trim()}'`);
               break;
         }
         rl.prompt();
      }).on("close", () => {
         console.log("Have a great day!");
         process.exit(0);
      });
   }
);
// rl.prompt();
