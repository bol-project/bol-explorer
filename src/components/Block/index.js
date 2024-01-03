import React, { Component } from "react";
import { Link } from "react-router-dom";

import BolContext from "../../bolContext";
import TransactionBlockListElement from "../Home/TransactionBlockListElement";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";

import "./style.css";

const dtFormat = Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

class Block extends Component {
  static contextType = BolContext;

  constructor() {
    super();
    this.state = {};
  }

  async componentDidUpdate (nextProps) {
      if(this.props.match.params.blockHash === nextProps.match.params.blockHash){
          return;
      }
      await this.fetchBlock();
   }

  async componentDidMount() {
    await this.fetchBlock();
  }

  async fetchBlock() {
    const client = this.context;
    let blockId = parseInt(this.props.match.params.blockHash);
    blockId = blockId.toString() === this.props.match.params.blockHash
        ? blockId
        : this.props.match.params.blockHash;
    
    var block = await client.getBlock(blockId);
    this.setState({ block });
    var bolDay = await client.getBolDay(block.index);
    
    this.setState({ bolDay });
  }

 render() {
    const block = this.state.block;
    const bolday = this.state.bolDay;
    const transactionBlockActivityList = block?.tx?.map(item => <TransactionBlockListElement key={item.txid} item={item}/>);

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
        <h2>Block Information</h2>
        <div>
          <table>
            <tbody>
              {[
                ["Block Hash:", block?.hash],
                ["Block Height:", block?.index],                
                [
                   "Timestamp:",
                    dtFormat.format(
                      new Date(0).setUTCSeconds(block?.time ?? 0)
                    ),
                ],
                ["Bol Day:", bolday?.Day], 
                ["Size:", block?.size],
                [
                "Previous Block:",
                <Link to={"/block/"+block?.previousblockhash}>
                    <span>{block?.previousblockhash}</span>
                </Link>,
                ],            
                [
                "Next Block:",
                <Link to={"/block/" + block?.nextblockhash}>
                    <span>{block?.nextblockhash}</span>
                </Link>,
                ],
                ["Merkle Root:", block?.merkleroot], 
                ["Block Producer:", block?.nextconsensus], 
                ["Version:", block?.version],   
                ["Invocation Script:", block?.script.invocation],    
                ["Verification Script:", block?.script.verification],    
                ["Block Time:", bolday?.Time],    
                ["Number of Transactions:", block?.tx.length],                   
                  
              ].map(([label, value], index) => (
                <TableRow key={index} label={label} value={value} />
              ))}

            </tbody>
          </table>
        </div>

        <br/>
        <br/>
        <br/>
        <br/>
        <h3>Block transactions</h3>
        <div className="table-header btn btn-twitter ">
            <Row>
                <Col sm> <span>Transaction Type</span></Col>
                <Col sm><span>Transaction ID</span></Col>
            </Row>
        </div>
        {transactionBlockActivityList}

      </div>
    );
  }
}

export default Block;
