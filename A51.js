var fs = require('fs');
//var prompt = require('prompt');


prompt.start();

var key = "0010101000110000101011001001100110001001100101111011010001110000"

let keyStream = [];

var plainTextFile = process.argv[1];
plainTextFile = plainTextFile.substring(0, plainTextFile.lastIndexOf('/') + 1) + 'plaintext.txt';


/*prompt.get(['key', 'plain text file'], function(err, result) {
  console.log(result);
});*/

var plainText = fs.readFileSync(plainTextFile, 'utf8');

var binaryPlainText = convertStringToBinary(plainText)
console.log(binaryPlainText.length);
//console.log(plainText);


//Create Registers
let xRegister = key.slice(0,19).split('');

let yRegister = key.slice(19,41).split('');

let zRegister = key.slice(41,64).split('');

//Generate keystream
while (keyStream.length < binaryPlainText.length) {
  var m = 0;
  if(xRegister[8] + yRegister[10] + zRegister[10] > 1) {
    m = 1;
  } else {
    m = 0;
  }
  if (xRegister[8] == m) {
    var newBit = xRegister[13] ^ xRegister[16] ^ xRegister[17] ^ xRegister[18]
    xRegister.unshift(newBit);
    xRegister.pop();
  }
  if (yRegister[10] == m) {
    var newBit = yRegister[20] ^ yRegister[21]
    yRegister.unshift(newBit);
    yRegister.pop();
  }
  if(zRegister[10] == m) {
    var newBit = zRegister[7] ^ zRegister[20] ^ zRegister[21] ^ zRegister[22]
    zRegister.unshift(newBit)
    zRegister.pop();
  }

  keyStream.push(xRegister[18] ^ yRegister[21] ^ zRegister[22])
}

//Generate ciphertext
let binaryCipherText = '';
for (char in binaryPlainText) {
  binaryCipherText += keyStream[char] ^ binaryPlainText[char]
}

console.log(binaryCipherText);

let cipherText = ''
for (var i = 0; i < binaryCipherText.length; i+=7) {
  cipherText += String.fromCharCode(parseInt(binaryCipherText.substring(i, i+7),2).toString(10));
}

console.log(cipherText);

let binaryPlainTextDecrypt = ''
for (char in binaryCipherText) {
  binaryPlainTextDecrypt += keyStream[char] ^ binaryCipherText[char]
}

let plainTextDecrypted = ''
for (var i = 0; i < binaryPlainTextDecrypt.length; i+=7) {
  plainTextDecrypted += String.fromCharCode(parseInt(binaryPlainTextDecrypt.substring(i, i+7),2).toString(10));
}
console.log(plainTextDecrypted);


function convertStringToBinary(s) {
  let fullBinary = '';
  for(char in s) {
    var binary = s.charCodeAt(char).toString(2);
    while (binary.length < 7) {
      binary = '0' + binary
    }
    fullBinary += binary
  }
  return fullBinary
}

function setRegisters() {
  let xRegister = key.slice(0,19);

  let yRegister = key.slice(19,41);

  let zRegister = key.slice(41,64);
}
