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

const CirculatingSupply = 0x06;
const TotalRegisteredPersons = 0x08;
const TotalRegisteredCompanies = 0x09;
const TotalCertifiers = 0x04;
const NewBol = 0xb9;
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
  addMultiCitizenship: ["ShortHash", "CodeName"],
  setCertifierFee: ["CertifierCodeName", "CertifierFee"]
};

class BolClient {
  rpc;
  bolHash;

  transferFee;
  operationsFee;
  claimInterval;

  constructor(endpoint) {
    this.rpc = new JsonRpcClient({
      endpoint: endpoint,
    });
  }

  async initialize() {
    this.bolHash = await this.rpc.request("getbolhash");
  }

  async getBlockHeight() {
    return await this.rpc.request("getblockcount");
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
    if (this.claimInterval) return this.claimInterval;
    const response = await this.rpc.request(
      "getstorage",
      this.bolHash,
      key(ClaimInterval)
    );
    this.claimInterval = leHexToDecimal(response);
    return this.claimInterval;
  }

  async getCirculatingSupply() {
    const response = await this.rpc.request("getstorage", this.bolHash, key(CirculatingSupply));
    return toFixedPointDecimal(leHexToDecimal(response));
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

  async getTotalRegisteredPersonsByBlock(blockHeight) {
    return await this.getStorageByBlock(TotalRegisteredPersons, blockHeight);
  }

  async getTotalRegisteredPersons() {
    const response = await this.rpc.request(
      "getstorage",
      this.bolHash,
      key(TotalRegisteredPersons)
    );
    return leHexToDecimal(response);
  }

  async getTotalRegisteredCompaniesByBlock(blockHeight) {
    return await this.getStorageByBlock(TotalRegisteredCompanies, blockHeight);
  }

  async getTotalRegisteredCompanies() {
    const response = await this.rpc.request(
      "getstorage",
      this.bolHash,
      key(TotalRegisteredCompanies)
    );
    return leHexToDecimal(response);
  }

  async getTotalCertifiers() {
    const storageByBlockKey = key(TotalCertifiers) + dkey(5000257);
    const response = await this.rpc.request(
      "getstorage",
      this.bolHash,
      storageByBlockKey
    );
    const matches = response.match(/0026|0027|0028/g);
    return matches ? matches.length : 0;
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

  async getBlockDay(blockHeight) {
    if (!blockHeight) return 0;

    const claimInterval = Number(await this.getClaimInterval());
    const blockDay = Math.floor(Number(blockHeight) / claimInterval);
    return blockDay;
  }

  async getBolDay(bolDayIndex) {
    const claimInterval = Number(await this.getClaimInterval());
    const blockHeight = Number(bolDayIndex) * claimInterval;

    const bolDay = {};
    bolDay.TotalRegisteredPersons = (
      await this.getTotalRegisteredPersonsByBlock(blockHeight)
    )?.toString();
    bolDay.TotalRegisteredCompanies = (
      await this.getTotalRegisteredCompaniesByBlock(blockHeight)
    )?.toString();
    bolDay.TotalCertifiers = (await this.getTotalCertifiers())?.toString();
    bolDay.NewBol = toFixedPointDecimal(await this.getNewBol(blockHeight));
    bolDay.DistributePerPerson = toFixedPointDecimal(
      await this.getDistributePerPerson(blockHeight)
    );
    bolDay.Population = toFixedPointDecimal(
      await this.getPopulation(blockHeight)
    );
    bolDay.TotalSupply = toFixedPointDecimal(
      await this.getTotalSupply(blockHeight)
    );
    bolDay.Day = bolDayIndex;
    bolDay.Block = blockHeight;

    return bolDay;
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
    } else if (bolData.BolTransactionType === "unregisterCertifier") {
      bolData.TransactionFee = (await this.getTransferFee()).toString();
    } else if (bolData.BolTransactionType === "setCertifierFee") {
      bolData.TransactionFee = (await this.getTransferFee()).toString();
    }
    bolData.TransactionFee = toFixedPointDecimal(
      bolData.TransactionFee.toString()
    );

    return bolData;
  }
}

const bolClientInstance = new BolClient(process.env.REACT_APP_SERVER_URL);

export default bolClientInstance;
