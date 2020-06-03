//for the Encoder we will create a text formatter file that will take in a string with a length no longer than 4  and output an encoded value representing that string

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
      if (x === "1") {
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
checker = new AEncoder("Full").encodeString();
console.log(checker); //131107009

//for the Decoder we will create a class that will take in a string in decimal format and decode it into encoded letters

//our decoder has 32 slots in which we will map over a value to which character it will be decoded to ---- each character will have a binary value that we will transform into Hex

//create a Class that takes in a 32 bit string and will map over it to find out where each bit belongs in a group of 4 character strings
class ADecoder {
  //for the decoder we will be getting the input of a 32bit string
  constructor(string) {
    this.string = string;
    //this will create an empty array that will make 32 slots to map our Encoded--> Raw values over to. We will seperate this array to represent each character
    this.encodeArray = Array.apply(null, Array(32)).fill(0);
    this.charOne = "";
    this.charTwo = "";
    this.charThree = "";
    this.charFour = "";
  }

  DecodeMap() {
    // charOne: { 0: 3, 1: 7, 2: 11, 3: 15, 4: 19, 5: 23, 6: 27, 7: 31 },
    // charTwo: { 0: 2, 1: 6, 2: 10, 3: 14, 4: 18, 5: 22, 6: 26, 7: 30 },
    // charThree: { 0: 1, 1: 5, 2: 9, 3: 13, 4: 17, 5: 21, 6: 25, 7: 29 },
    // charFour: { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 28 },

    //  charOne: { 3: 0, 7: 1, 11: 2, 15: 3, 19: 4, 23: 5, 27: 6, 31: 7 },
    //       charTwo: { 2: 0, 6: 1, 10: 2, 14: 3, 18: 4, 22: 5, 26: 6, 30: 7 },
    //       charThree: { 1: 0, 5: 1, 9: 2, 13: 3, 17: 4, 21: 5, 25: 6, 29: 7 },
    //       charFour: { 0: 0, 4: 1, 8: 2, 12: 3, 16: 4, 20: 5, 24: 6, 28: 7 },
    return {
      0: 0,
      1: 8,
      2: 16,
      3: 24,
      4: 1,
      5: 9,
      6: 17,
      7: 25,
      8: 2,
      9: 10,
      10: 18,
      11: 26,
      12: 3,
      13: 11,
      14: 19,
      15: 27,
      16: 4,
      17: 12,
      18: 20,
      19: 28,
      20: 5,
      21: 13,
      22: 21,
      23: 29,
      24: 6,
      25: 14,
      26: 22,
      27: 30,
      28: 7,
      29: 15,
      30: 23,
      31: 31,
    };
  }

  decodeDecimal() {
    let decToBinaryPadded =
      "00000000000000000000000000000000".substr(
        Number(266522386).toString(2).length
      ) + Number(266522386).toString(2);

    decToBinaryPadded.split("").map((num, index) => {
      if (num === "1") {
        this.encodeArray[this.DecodeMap()[index]] = 1;
        // console.log(this.DecodeMap()[index]);
      }
    });
    console.log(this.encodeArray);
  }
}

decoding = new ADecoder("266522386").decodeDecimal();
console.log(decoding);
