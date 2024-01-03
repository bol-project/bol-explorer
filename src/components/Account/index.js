import React, { Component } from "react";
import { Link } from "react-router-dom";
import BolContext from "../../bolContext";

import "./style.css";

const TableRow = ({
  label,
  value,
  valueStyle = { whiteSpace: "inherit", wordBreak: "break-word" },
}) => (
  <tr>
    <td className="tdLabel">{label}</td>
    <td style={valueStyle}>{value}</td>
  </tr>
);

const Transaction = ({ id, transaction }) => (
  <>
    <table>
      <tbody>
        <TableRow label="Transaction Number" value={id} />
        <TableRow
          label="TransactionHash"
          value={transaction?.TransactionHash}
        />
        <TableRow
          label="TransactionType"
          value={translateTransactionType(transaction?.TransactionType)}
        />
        <TableRow label="SenderCodeName" value={transaction?.SenderCodeName} />
        <TableRow label="SenderAddress" value={transaction?.SenderAddress} />
        <TableRow
          label="ReceiverCodeName"
          value={transaction?.ReceiverCodeName}
        />
        <TableRow
          label="ReceiverAddress"
          value={transaction?.ReceiverAddress}
        />
        <TableRow label="Amount" value={transaction?.Amount} />
      </tbody>
    </table>
    <br />
  </>
);

const translateTransactionType = (type) => {
  if (!type) return "";
  switch (type) {
    case 1:
      return "Claim";
    case 2:
      return "Claim Transfer";
    case 3:
      return "Transfer";
    case 4:
      return "Payment of Fees";
    case 5:
      return "Register";
    case 6:
      return "Whitelist";
    case 7:
      return "Certifier Selection";
    case 8:
      return "Certification Request";
    case 9:
      return "Certify";
    case 10:
      return "UnCertify";
    case 11:
      return "Register as Certifier";
    case 12:
      return "UnRegister as Certifier";
    case 13:
      return "Add Multi Citizenship";
  }
};

const translateStatus = (status) => {
  if (!status) return "";
  switch (status) {
    case 1:
      return "Open";
    case 2:
      return "Pending Certifications";
    case 3:
      return "Pending Fee Payment";
    case 4:
      return "Locked";
  }
};

const translateAccountType = (type) => {
  if (!type) return "";
  return type === 1 ? "Person" : "Company";
};
class Account extends Component {
  static contextType = BolContext;

  constructor() {
    super();

    this.state = {};
  }

  async componentDidMount() {
    const client = this.context;
    const codeName = this.props.match.params.codeName;
    const account = await client.getAccount(codeName);
    this.setState({ account });
  }

  render() {
    const account = this.state.account;
    //var timestamp = new Date(account.timestamp).toLocaleString();

    return (
      <div className="view-page">
        <h2>Account Information</h2>
        <div>
          <table>
            <tbody>
              <TableRow
                label="Account Type"
                value={translateAccountType(account?.AccountType)}
              />
              <TableRow
                label="Account Status"
                value={translateStatus(account?.AccountStatus)}
              />
              <TableRow label="CodeName" value={account?.CodeName} />
              <TableRow label="EDI" value={account?.Edi} />
              <TableRow
                label="Registration Height"
                value={account?.RegistrationHeight}
              />
              <TableRow
                label="Last Claim Height"
                value={account?.LastClaimHeight}
              />
              <TableRow
                label="Last Claim Received"
                value={account?.LastClaim}
              />
            </tbody>
          </table>
        </div>
        <br />
        <h2>Addresses</h2>
        <div>
          <table>
            <tbody>
              <TableRow label="Main Address" value={account?.MainAddress} />
              <TableRow
                label="BlockChain Address"
                value={account?.BlockChainAddress}
              />
              <TableRow label="Social Address" value={account?.SocialAddress} />
              <TableRow label="Voting Address" value={account?.VotingAddress} />
              {account?.CommercialAddresses.map((address, index) => (
                <TableRow
                  key={address}
                  label={"Commercial Address " + index}
                  value={address}
                />
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <h2>Balances</h2>
        <div>
          <table>
            <tbody>
              <TableRow label="Total" value={account?.TotalBalance} />
              <TableRow label="Claim" value={account?.ClaimBalance} />
              <TableRow label="" value="" />
              {account?.CommercialAddresses.map((address, index) => (
                <TableRow
                  key={address}
                  label={"Commercial Address " + index}
                  value={account.CommercialBalances[address]}
                />
              ))}
              <TableRow label="" value="" />
            </tbody>
          </table>
        </div>
        <br />
        <h2>Certifications</h2>
        <div>
          <table>
            <tbody>
              <TableRow
                label="Number of Certifications"
                value={account?.Certifications}
              />
              <TableRow
                label="Is Certifier"
                value={account?.IsCertifier?.toString()}
              />
              <TableRow
                label="Last Certification Height"
                value={account?.LastCertificationHeight}
              />
              <TableRow
                label="Last CertifierSelection Height"
                value={account?.LastCertifierSelectionHeight}
              />
              <TableRow label="Collateral" value={account?.Collateral} />
              <TableRow
                label="Certification Fee"
                value={account?.CertificationFee}
              />
              <TableRow
                label="Certifiable Countries"
                value={account?.Countries}
              />
              <TableRow label="" value="" />
              <TableRow label="Certifiers" value="Certified At Block" />
              {Object.entries(account?.Certifiers ?? {}).map(
                ([certifier, block], index) => (
                  <TableRow key={certifier} label={certifier} value={block} />
                )
              )}
              <TableRow label="" value="" />
              <TableRow
                label="Mandatory Certifiers"
                value="Selected At Block"
              />
              {Object.entries(account?.MandatoryCertifiers ?? {}).map(
                ([certifier, block], index) => (
                  <TableRow key={certifier} label={certifier} value={block} />
                )
              )}
              <TableRow label="" value="" />
            </tbody>
          </table>
        </div>
        <br />
        <h2>Transactions</h2>
        <div>
          {Object.entries(account?.Transactions ?? {})
            .sort(([id1], [id2]) => id2 - id1)
            .map(([id, transaction], index) => (
              <Transaction key={index} id={id} transaction={transaction} />
            ))}
        </div>
      </div>
    );
  }
}

export default Account;
