import JsonRpcClient from "react-jsonrpc-client";
import {
  leHexToDecimal,
  decimalToLeHex as dkey,
  leHexToString as key,
  leHexToBeHex,
  hexToAscii,
  toFixedPointDecimal,
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
  registerCertifier: ["CodeName", "CertificationFee"],
  unregisterCertifier: ["CodeName"],
};

class BolClient {
  rpc;
  bolHash;

  transferFee;
  operationsFee;

  constructor(endpoint) {
    this.rpc = new JsonRpcClient({
      endpoint: endpoint,
    });
  }

  async initialize() {
    this.bolHash = await this.rpc.request("getbolhash");
  }

  async getTransferFee() {
    if (this.transferFee) return this.transferFee;
    const response = await this.rpc.request(
      "getstorage",
      this.bolHash,
      key(TransferFee)
    );
    this.transferFee = leHexToDecimal(response);
    return this.transferFee;
  }

  async getOperationsFee() {
    if (this.operationsFee) return this.operationsFee;
    const response = await this.rpc.request(
      "getstorage",
      this.bolHash,
      key(OperationsFee)
    );
    this.operationsFee = leHexToDecimal(response);
    return this.operationsFee;
  }

  async getTransaction(transactionId) {
    const transaction = await this.rpc.request(
      "getrawtransaction",
      transactionId,
      1
    );

    if (transaction.type === "InvocationTransaction") {
      const bolData = await this.parseBolData(transaction);
      transaction.bolData = bolData;
    }

    return transaction;
  }

  async getBlock(blockId) {
    const block = await this.rpc.request("getblock", blockId, 1);
    return block;
  }

  async getAccount(codeName) {
    const account = await this.rpc.request("getaccount", codeName);
    return account;
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
    const response = await this.rpc.request(
      "getstorage",
      this.bolHash,
      storageByBlockKey
    );
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

  async parseBolData(transaction) {
    const bolData = {};

    const scriptAttribute = transaction.attributes?.find(
      (item) => item.usage === "Script"
    );
    if (scriptAttribute) {
      bolData.SignedByAddress = scriptHashToAddress(scriptAttribute.data);
    }

    if (transaction.script) {
      const contractHash = leHexToBeHex(transaction.script).substring(0, 40);
      bolData.ContractHash = contractHash;
    }

    const remarks = transaction.attributes
      ?.filter((attribute) => attribute.usage.startsWith("Remark"))
      .map((attribute) => hexToAscii(attribute.data));

    const bolTransactionType = remarks[0];
    bolData.BolTransactionType = bolTransactionType;
    const keys = remarksTable[bolTransactionType];
    keys.forEach((key, index) => {
      let remark = remarks[index + 1];
      if (
        key.toLowerCase().includes("fee") ||
        key.toLowerCase().includes("value")
      ) {
        remark = toFixedPointDecimal(remark);
      }
      bolData[key] = remark;
    });

    bolData.TransactionFee = 0;
    if (bolData.BolTransactionType === "transfer") {
      bolData.TransactionFee = (await this.getTransferFee()).toString();
    } else if (bolData.BolTransactionType === "transferClaim") {
      bolData.TransactionFee = (await this.getOperationsFee()).toString();
    }
    bolData.TransactionFee = toFixedPointDecimal(
      bolData.TransactionFee.toString()
    );

    return bolData;
  }
}

const bolClientInstance = new BolClient(process.env.REACT_APP_SERVER_URL);

export default bolClientInstance;
