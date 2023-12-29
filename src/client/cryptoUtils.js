import CryptoJS from "crypto-js";
import Base58 from "base-58";

const bolAddressPrefix = "19";

/**
 * Converts a ScriptHash string in hex format to a Bol Address
 * @param {string} scriptHash
 * @returns {string}
 */
function scriptHashToAddress(scriptHash) {
  let address = bolAddressPrefix + scriptHash;
  const message = CryptoJS.enc.Hex.parse(address);
  const hash = CryptoJS.SHA256(CryptoJS.SHA256(message));
  const stringhash = hash.toString().slice(0, 8);
  address = address + stringhash;
  return Base58.encode(Buffer.from(address, "hex"));
}

export { scriptHashToAddress };
