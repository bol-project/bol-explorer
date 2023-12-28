import JsonRpcClient from "react-jsonrpc-client";
import {
  leHexToDecimal,
  decimalToLeHex as dkey,
  leHexToString as key,
  leHexToBeHex,
  hexToAscii,
} from "./hexUtils";
import { scriptHashToAddress } from "./cryptoUtils";

const TransferFee = 0xc0;
const OperationsFee = 0xc1;
const ClaimInterval = 0xb3;

const TotalRegisteredPersons = 0x08;
const TotalRegisteredCompanies = 0x09;
const TotalCertifiers = 0x0a;
const NewBol = 0xb6;
const DistributePerPerson = 0xb4;
const Population = 0xb7;
const TotalSupply = 0xb8;

const remarksTable = {
  register: ["CodeName", "MainAddress"],
  claim: ["CodeName"],
  transferClaim: ["CodeName", "TargetAddress", "Value"],
  transfer: [
    "SenderCodeName",
    "SenderAddress",
    "TargetCodeName",
    "TargetAddress",
    "Value",
  ],
  certify: ["CertifierCodeName", "TargetCodeName"],
  whitelist: ["CertifierCodeName", "TargetMainAddress"],
  selectMandatoryCertifiers: ["CodeName"],
  payCertificationFees: ["CodeName"],
  requestCertification: ["RequesterCodeName", "CertifierCodeName"],
  migrate: ["ContractName", "ContractVersion", "ContractScriptHash"],
};

class BolClient {
  rpc;
  bolHash;

  constructor(endpoint) {
    this.rpc = new JsonRpcClient({
      endpoint: endpoint,
    });
  }

  async initialize() {
    this.bolHash = await this.rpc.request("getbolhash");
  }

  async getTransferFee() {
    const response = await this.rpc.request(
      "getstorage",
      this.bolHash,
      key(TransferFee)
    );
    return leHexToDecimal(response);
  }

  async getOperationsFee() {
    const response = await this.rpc.request(
      "getstorage",
      this.bolHash,
      key(OperationsFee)
    );
    return leHexToDecimal(response);
  }

  async getTransaction(transactionId) {
    const transaction = await this.rpc.request(
      "getrawtransaction",
      transactionId,
      1
    );

    if (transaction.type === "InvocationTransaction") {
      const bolData = this.parseBolData(transaction);
      transaction.bolData = bolData;
    }

    return transaction;
  }

  async getBlock(blockId) {
    const block = await this.rpc.request("getblock", blockId, 1);
    return block;
  }

  async getClaimInterval() {
    const response = await this.rpc.request(
      "getstorage",
      this.bolHash,
      key(ClaimInterval)
    );
    return leHexToDecimal(response);
  }

  async getStorageByBlock(storageKey, blockHeight) {
    const storageByBlockKey = key(storageKey) + dkey(blockHeight);
    const response = await this.rpc.request("getstorage", this.bolHash, storageByBlockKey);
    return leHexToDecimal(response);
  }

  async getTotalRegisteredPersons(blockHeight) {
    return await this.getStorageByBlock(TotalRegisteredPersons, blockHeight);
  }

  async getTotalRegisteredCompanies(blockHeight) {
    return await this.getStorageByBlock(TotalRegisteredCompanies, blockHeight);
  }

  async getTotalCertifiers(blockHeight) {
    return await this.getStorageByBlock(TotalCertifiers, blockHeight);
  }

  async getNewBol(blockHeight) {
    return await this.getStorageByBlock(NewBol, blockHeight);
  }

  async getDistributePerPerson(blockHeight) {
    return await this.getStorageByBlock(DistributePerPerson, blockHeight);
  }

  async getPopulation(blockHeight) {
    return await this.getStorageByBlock(Population, blockHeight);
  }

  async getTotalSupply(blockHeight) {
    return await this.getStorageByBlock(TotalSupply, blockHeight);
  }

  parseBolData(transaction) {
    const bolData = {};

    const scriptAttribute = transaction.attributes?.find(
      (item) => item.usage === "Script"
    );
    if (scriptAttribute) {
      bolData.Address = scriptHashToAddress(scriptAttribute.data);
    }

    if (transaction.script) {
      const contractHash = leHexToBeHex(transaction.script).substring(0, 40);
      bolData.ContractHash = contractHash;
    }

    const remarks = transaction.attributes
      ?.filter((attribute) => attribute.usage.startsWith("Remark"))
      .map((attribute) => hexToAscii(attribute.data));

    const keys = remarksTable[remarks[0]];
    keys.forEach((key, index) => {
      bolData[key] = remarks[index + 1];
    });

    return bolData;
  }
}

const bolClientInstance = new BolClient(process.env.REACT_APP_SERVER_URL);

export default bolClientInstance;
