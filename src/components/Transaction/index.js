import React, { Component } from "react";
import { Link } from "react-router-dom";

import BolContext from "../../bolContext";

import "./style.css";

const dtFormat = Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

class Transaction extends Component {
  static contextType = BolContext;

  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    const client = this.context;
    var transaction = await client.getTransaction(
      this.props.match.params.transactionHash
    );
    this.setState({ transaction });
  }

  render() {
    const transaction = this.state.transaction;

    const invocationScript = transaction?.scripts?.[0]?.invocation;
    const verificationScript = transaction?.scripts?.[0]?.verification;

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

    return (
      <div className="view-page">
        <h2>Transaction Information</h2>
        <div>
          <table>
            <tbody>
              {[
                ["Transaction Id:", transaction?.txid],
                ["Transaction Type:", transaction?.type],
                [
                  "Included in block:",
                  <Link to={"/block/" + transaction?.blockhash}>
                    <span>{transaction?.blockhash}</span>
                  </Link>,
                ],
                [
                  "Timestamp:",
                  dtFormat.format(
                    new Date(0).setUTCSeconds(transaction?.blocktime ?? 0)
                  ),
                ],
                ["Network Fee:", transaction?.net_fee],
                ["Size:", transaction?.size],
                ["Invocation script:", invocationScript],
                ["Verification script:", verificationScript],
                ["", "Bol Data"],
              ].map(([label, value], index) => (
                <TableRow key={index} label={label} value={value} />
              ))}

              {Object.entries(transaction?.bolData ?? {})
                .sort()
                .map(([key, value], index) => {
                  if (key.includes("CodeName")) {
                    value = (
                      <Link to={"/account/" + value}>
                        <span>{value}</span>
                      </Link>
                    );
                  }
                  return <TableRow key={key} label={key} value={value} />;
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Transaction;
