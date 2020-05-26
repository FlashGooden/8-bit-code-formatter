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
encodedDecimal = Array.apply(null, Array(32)).fill(0);

console.log(encodedDecimal.length);
//first we will grab the Hex Value of the character
hexCharValue = "A".charCodeAt(0).toString(16);
//then we will transform the Hex into the Decimal Value
binaryChar = parseInt("41", 16).toString(2);
//We will use this to transform the decimal value into binary
decToBinary = Number(65).toString(2);
console.log(binaryChar);
