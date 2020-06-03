//we will create a text formatter file that will take in a string with a length no longer than 4  and output an encoded value representing that string

//our encoder has 32 slots in which we will map over a value to which position it will be encoded to

//create a Class that takes each character then will grab hex and binary values to assign to an array which will be our return for a decimal value that is encoded

class AEncoder {
  constructor(string) {
    this.string = string;
    //this will create an empty array that will make 32 slots to map our Raw --> Encoded values over to. We will join this array to make the full encoded array of all characters
    this.encodeArray = Array.apply(null, Array(32)).fill(0);
  }
  //this will return our final Array in decimal format
  putBack() {
    return this.encodeArray;
  }
  //we will create a text formatter file that will take in a string with a length no longer than 4  and output an encoded value representing that string

  //our encoder has 32 slots in which we will map over a value to which position it will be encoded to

  //create an object that takes each character then has a key for the original slot, then places the value in the encoding slot

  EncodedMap() {
    return {
      charOne: { 0: 3, 1: 7, 2: 11, 3: 15, 4: 19, 5: 23, 6: 27, 7: 31 },
      charTwo: { 0: 2, 1: 6, 2: 10, 3: 14, 4: 18, 5: 22, 6: 26, 7: 30 },
      charThree: { 0: 1, 1: 5, 2: 9, 3: 13, 4: 17, 5: 21, 6: 25, 7: 29 },
      charFour: { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 28 },
    };
  }

  encodeString() {
    //error handling if more than four characters
    if (this.string.length > 4) throw Error("The input is too long");
    //turn the string into iterable object
    let eachLetterArray = this.string.split("");
    //map over the Array to find proper values
    eachLetterArray.map((char, charIndex) => {
      //first we will grab the Hex Value of the character
      let hexCharValue = char.charCodeAt(0).toString(16);
      //then we will transform the Hex into the Decimal Value
      let binaryChar = parseInt(hexCharValue, 16).toString(2);
      //We will use this to transform the decimal value into binary

      //pad binary number so we can loop over it properly
      let paddedDecToBinary = "00000000".substr(binaryChar.length) + binaryChar;
      //maps over binary value for letter then checks EncodedMap to correspond with final array
      let encodeReturn = this.mapCharacterToBinary(
        paddedDecToBinary,
        charIndex
      );
    });
    return parseInt(this.putBack().join(""), 2);
  }
  mapCharacterToBinary(paddedDec, charIndex) {
    //loop over binary number and use the encoding map to change value of encodedDecimal to 1 for any spot that matches
    // debugger;
    let index = 0;
    for (let x of paddedDec) {
      //comparing string to string
      if (x == "1") {
        // console.log(index);
        // console.log(this.EncodedMap.charOne[index]);
        //use the index value to find where the encoded value is located
        // let mapIndex = this.EncodedMap.charOne[index];
        let mapIndex = this.EncodedMap()[
          Object.keys(this.EncodedMap())[charIndex]
        ][index];
        //assign the
        this.encodeArray[mapIndex] = 1;
      }
      // console.log(x);
      index++;
    }
  }
}
//use these to check class function
checker = new AEncoder("full").encodeString();
console.log(checker); //131107009
