//we will create a text formatter file that will take in a string with a length no longer than 4  and output an encoded value representing that string

//our encoder has 32 slots in which we will map over a value to which position it will be encoded to

//create an object that takes each character then has a key for the original slot, then places the value in the encoding slot

let encodedMap = {
  charOne: { 0: 3, 1: 7, 2: 11, 3: 15, 4: 19, 5: 23, 6: 27, 7: 31 },
  charTwo: { 0: 2, 1: 6, 2: 10, 3: 14, 4: 18, 5: 22, 6: 26, 7: 30 },
  charThree: { 0: 1, 1: 5, 2: 9, 3: 13, 4: 17, 5: 21, 6: 25, 7: 29 },
  charFour: { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 28 },
};

for (x in encodedMap.charOne) {
  console.log(encodedMap.charOne[x]);
}

//this will create an empty array that will make 32 slots to map our Raw --> Encoded values over to. We will join this array to make the full encoded array of all characters
let encodedDecimal = Array.apply(null, Array(32)).fill(0);

//first we will grab the Hex Value of the character
let hexCharValue = "A".charCodeAt(0).toString(16);
//then we will transform the Hex into the Decimal Value
let binaryChar = parseInt("41", 16).toString(2);
//We will use this to transform the decimal value into binary
let decToBinary = Number(65).toString(2);
//pad binary number so we can loop over it properly
let paddedDecToBinary = "00000000".substr(decToBinary.length) + decToBinary;
console.log(paddedDecToBinary);
//loop over binary number and use the encoding map to change value of encodedDecimal to 1 for any spot that matches
let index = 0;
for (x of paddedDecToBinary) {
  //comparing string to string
  if (x == "1") {
    // console.log(index);
    console.log(encodedMap.charOne[index]);
    //use the index value to find where the encoded value is located
    let mapIndex = encodedMap.charOne[index];
    //assign the
    encodedDecimal[mapIndex] = 1;
  }
  // console.log(x);
  index++;
}

console.log(encodedDecimal);
console.log(encodedDecimal.join(""));
