import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import BolContext from "../../bolContext";

import "./style.css";
import BlockListElement from "./BlockListElement";
import TransactionListElement from "./TransactionListElement";
import TotalActivity from "./TotalActivity";
import MarketActivity from "./MarketActivity";
import PageHeader from "../PageHeader/PageHeader";
import { BolDaysTable } from "../BolDays";

class Home extends Component {
  static contextType = BolContext;

  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      transactions: [],
      mainStats: {},
      communityStats: {},
    };
  }

  async componentDidMount() {
    const client = this.context;
    const blockHeight = Number(await client.getBlockHeight()) - 1;
    const circulatingSupply = await client.getCirculatingSupply();
    const claimInterval = Number(await client.getClaimInterval());

    this.setState({
      mainStats: {
        totalBlocks: blockHeight,
        totalDays: Math.floor(blockHeight / claimInterval),
      },
    });

    let blocks = [];
    for (let i = blockHeight; i >= blockHeight - 5; i--) {
      const block = await client.getBlock(i);
      blocks.push(block);
    }
    this.setState({ blocks: blocks });

    let transactions = [];
    for (let block of blocks) {
      for (let tx of block.tx) {
        if (transactions.length >= 5) break;
        tx.timestamp = block.time;
        transactions.push(tx);
      }
    }
    this.setState({ transactions: transactions });

    const totalIndividuals = await client.getTotalRegisteredPersons();
    const totalEntities = await client.getTotalRegisteredCompanies();
    const certifiers = await client.getTotalCertifiers();
    this.setState({
      communityStats: {
        circulatingSupply: circulatingSupply?.toString() ?? "0",
        totalIndividuals: totalIndividuals?.toString() ?? "0",
        totalEntities: totalEntities?.toString() ?? "0",
        certifiers: certifiers?.toString() ?? "0",
      },
    });
  }

  render() {
    return (
      <div>
        <PageHeader />
        <div className="home">
          <TotalActivity item={this.state.mainStats} />
          <br />
          <br />

          <MarketActivity item={this.state.communityStats} />
          <br />
          <br />

          <p className="semi-title">Last 5 Transactions</p>
          <Table>
          <Thead>
            <Tr>
              <Th className="custom-header">Transaction Type</Th>
              <Th className="custom-header">Transaction ID</Th>
              <Th className="custom-header">Timestamp</Th>
            </Tr>
          </Thead>
          <Tbody>
            {this.state.transactions.map((tx) => (
              <TransactionListElement key={tx.txid} item={tx} />
            ))}
          </Tbody>
        </Table>
          <Link to="/transactions/1">
            <Button color="twitter">See all transactions</Button>
          </Link>
          <br />
          <br />

          <p className="semi-title">Last 5 Blocks</p>
          <Table>
            <Thead>
              <Tr>
                <Th className="custom-header">Height</Th>
                <Th className="custom-header">Size</Th>
                <Th className="custom-header">Transactions</Th>
                <Th className="custom-header">Producer</Th>
                <Th className="custom-header">Timestamp</Th>
              </Tr>
            </Thead>
            <Tbody>
              {this.state.blocks.map((block) => (
                <BlockListElement key={block.hash} item={block} />
              ))}
            </Tbody>
          </Table>
          <Link to="/blocks/1">
            <Button color="twitter">See all blocks</Button>
          </Link>
          <br />
          <br />

          <p className="semi-title">Last 5 BoL Days</p>
          <BolDaysTable page={1} pageSize={5} />
          <Link to="/boldays/1">
            <Button color="twitter">See all days</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;