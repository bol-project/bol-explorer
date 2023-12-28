/**
 * Converts a little endian Hex value to a string compatible with the Bol RPC system.
 * @param {int | BigInt} hex
 * @returns {string}
 */
function leHexToString(hex) {
  var hexString = hex.toString(16);
  // Ensure the hex string has an even number of characters
  if (hexString.length % 2 !== 0) {
    hexString = "0" + hexString;
  }

  // Extract the first byte (two characters) and check its value
  let firstByte = parseInt(hexString.substring(0, 2), 16);

  // If the first byte is greater than 0x7F, add "00" at the end
  if (firstByte > 0x7f) {
    hexString += "00";
  }
  return hexString;
}

/**
 * Converts a decimal value to a little endian hex string
 * @param {int | BigInt} value
 * @returns {string}
 */
function decimalToLeHex(value) {
  // Check and ignore negative values
  if (value < 0) {
    return "Error: Negative numbers not supported";
  }

  // Convert to hexadecimal
  let hexString = value.toString(16);

  // Ensure even number of characters (2 characters per byte)
  if (hexString.length % 2 !== 0) {
    hexString = "0" + hexString;
  }

  // Check if the first byte exceeds 7F and add an extra byte if needed
  if (parseInt(hexString.substring(0, 2), 16) > 0x7f) {
    hexString = hexString + "00";
  }

  // Reverse the byte order to get little endian format
  let littleEndianHex = "";
  for (let i = hexString.length; i > 0; i -= 2) {
    littleEndianHex += hexString.substring(i - 2, i);
  }

  return littleEndianHex;
}

/**
 * Converts a little endian hex string to a BigInt decimal value
 * @param {string} hexString
 * @returns {BigInt}
 */
function leHexToDecimal(hexString) {
  let reversedHexString = leHexToBeHex(hexString);

  // Convert reversed hex to decimal
  let decimalValue = BigInt("0x" + reversedHexString);

  return decimalValue;
}

/**
 * Converts a little endian hex string to a big endian hex string
 * @param {string} hexString
 * @returns {string}
 */
function leHexToBeHex(hexString) {
  // Ensure the hex string has an even number of characters
  if (hexString.length % 2 !== 0) {
    hexString = "0" + hexString;
  }

  // Reverse the byte order
  let reversedHexString = hexString.match(/../g).reverse().join("");

  return reversedHexString;
}

const hexToAscii = (hex) =>
  Buffer.from(hex.toString(), "hex").toString("utf-8");

export {
  leHexToString,
  decimalToLeHex,
  leHexToDecimal,
  leHexToBeHex,
  hexToAscii,
};
