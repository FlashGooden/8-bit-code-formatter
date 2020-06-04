//importing our Decode --> RAW mapper
const mapper = require("./mapper.js");

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
   //we will create a text formatter file that will take in a string with a length no longer than 4     and output an encoded value representing that string

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
   //TODO: Refactor encodeString to look more like decodeDecimal, refactor the EncodedMap to one hash table instead of four hash tables, should improve the algorithm from O(n2) to O(n)
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
         let paddedDecToBinary =
            "00000000".substr(binaryChar.length) + binaryChar;
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
// checker = new AEncoder("hi").encodeString();
// console.log(checker); //131107009

//this class will Encode a whole sentence
class ASentenceEncoder {
   constructor(string) {
      this.string = string;
   }
   //this splits the word into arrays with 4 letters / Characters in each slot
   splitWord() {
      let wordArray = this.string.split("");
      var myArray = [];
      for (var i = 0; i < wordArray.length; i += 4) {
         myArray.push(wordArray.slice(i, i + 4));
      }
      // console.log(myArray)
      return this.eachWordDecimal(myArray);
      // return myArray;
   }
   //this will take in an array of words to be encoded into Decimal format
   eachWordDecimal(wordArray) {
      let decodeArray = [];
      wordArray.map((wordBit) => {
         decodeArray.push(new AEncoder(wordBit.join("")).encodeString());
      });
      return decodeArray;
   }
}
//test cases
// wordUp = new ASentenceEncoder("egad, a base tone denotes a bad age");
// console.log(wordUp.splitWord())

//for the Decoder we will create a class that will take in a string in decimal format and decode it into encoded letters

//our decoder has 32 slots in which we will map over a value to which character it will be decoded to ---- each character will have a binary value that we will transform into Hex

//create a Class that takes in a 32 bit string and will map over it to find out where each bit belongs in a group of 4 character strings
class ADecoder {
   //for the decoder we will be getting the input of a 32bit string
   constructor(string) {
      this.string = string;
      //this will create an empty array that will make 32 slots to map our Encoded--> Raw values over to. We will seperate this array to represent each character
      this.encodeArray = Array.apply(null, Array(32)).fill(0);
      //these 4 declarations are not 100% necessary, but leaving them in case we need to handle any errors later on
      this.charOne = [...this.encodeArray.slice(0, 7)];
      this.charTwo = [...this.encodeArray.slice(8, 15)];
      this.charThree = [...this.encodeArray.slice(16, 23)];
      this.charFour = [...this.encodeArray.slice(24, 31)];
   }

   DecodeMap() {
      return mapper.decodeMapper;
   }
   //decodeDecimal will take in a decimal number then convert it to binary
   decodeDecimal() {
      let decToBinaryPadded =
         "00000000000000000000000000000000".substr(
            Number(this.string).toString(2).length
         ) + Number(this.string).toString(2);

      decToBinaryPadded.split("").map((num, index) => {
         if (num === "1") {
            this.encodeArray[this.DecodeMap()[index]] = 1;
            // console.log(this.DecodeMap()[index]);
         }
      });
      // console.log(this.encodeArray);
      let prefix = "0x";
      this.charOne = parseInt(
         [...this.encodeArray.slice(-8)].join(""),
         2
      ).toString(16);
      this.charTwo = parseInt(
         [...this.encodeArray.slice(-16, -8)].join(""),
         2
      ).toString(16);
      this.charThree = parseInt(
         [...this.encodeArray.slice(-24, -16)].join(""),
         2
      ).toString(16);
      this.charFour = parseInt(
         [...this.encodeArray.slice(-32, -24)].join(""),
         2
      ).toString(16);

      // console.log(this.charFour, this.charThree, this.charTwo, this.charOne);

      return String.fromCharCode(
         `${prefix + this.charOne}`,
         `${prefix + this.charTwo}`,
         `${prefix + this.charThree}`,
         `${prefix + this.charFour}`
      );
   }
}
// test cases
// decoding = new ADecoder("82841860").decodeDecimal();
// console.log(decoding);

//this will take in an array of decimals and turn them into a sentence
class ASentenceDecoder {
   constructor(array) {
      this.array = [...array];
   }

   //decode each decimal in the array
   decodeEachDecimal() {
      let decimalArray = [];
      this.array.map((decimal) => {
         decimalArray.push(new ADecoder(decimal).decodeDecimal());
         // console.log(typeof decimal)
      });
      return this.arrayToSentence(decimalArray);
   }
   //join the array into one string for return
   arrayToSentence(decimalArray) {
      return decimalArray.join("");
   }
}
//test Cases for ASentenceDecoder
// sentenceDecode = new ASentenceDecoder([267389735, 82841860, 267651166, 250793668, 233835785, 267665210, 99680277, 133170194, 124782119]).decodeEachDecimal()
// console.log(sentenceDecode)

module.exports = { ASentenceDecoder, ASentenceEncoder };
