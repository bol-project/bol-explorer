import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './style.css';
import BlockListElement from "../Home/BlockListElement";

// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var blockUrl = "https://api.neoscan.io/api/main_net/v1/get_block/";

class Block extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    componentWillMount() {
        fetch('http://5d712628d3448a001411b54a.mockapi.io/' + this.props.match.params.blockHash)
            .then(res => res.json())
            .then((data) => {                   //remove 0 index of OK result and parse data to component
                data = data.splice(1);
                this.setState({
                    blockHash: data[0].blockHash,
                    blockHeight: data[0].blockHeight,
                    timestamp: data[0].timestamp,
                    blockProducer: data[0].blockProducer,
                    size: data[0].size,
                    version: data[0].version,
                    numberOfTransactions: data[0].transactions.length,
                    merkleRoot: data[0].merkleRoot,
                    previousBlock: data[0].previousBlock,
                    nextBlock: data[0].nextBlock,
                    currentWorldPopulation: data[0].currentWorldPopulation,
                    newRegisteredPeople: data[0].newRegisteredPeople,
                    totalCommunityPeople: data[0].totalCommunityPeople,
                    worldWalletAmount: data[0].worldWalletAmount,
                    distributePerPerson: data[0].distributePerPerson
                });
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="Block">
                <h2>Block Info</h2>
                <div>
                    <table>
                        <tbody>

                        <tr><td className="tdLabel">Block Hash: </td><td>{this.state.blockHash}</td></tr>
                        <tr><td className="tdLabel">Block Height: </td><td>{this.state.blockHeight}</td></tr>
                        <tr><td className="tdLabel">Date: </td><td>{this.state.timestamp}</td></tr>
                        <tr><td className="tdLabel">Block Producer: </td><td>{this.state.blockProducer}</td></tr>
                        <tr><td className="tdLabel">Size: </td><td>{this.state.size}</td></tr>
                        <tr><td className="tdLabel">Version: </td><td>{this.state.version}</td></tr>
                        <tr><td className="tdLabel">Size: </td><td>{this.state.size}</td></tr>
                        <tr><td className="tdLabel">Number of Transactions: </td><td>{this.state.numberOfTransactions}</td></tr>
                        <tr><td className="tdLabel">Merkle Root: </td><td>{this.state.merkleRoot}</td></tr>
                        <tr><td className="tdLabel">Previous Block: </td><td><Link to={`../block/${this.state.previousBlock}`}>{this.state.previousBlock}</Link></td></tr>
                        <tr><td className="tdLabel">Next Block: </td><td><Link to={`../block/${this.state.nextBlock}`}>{this.state.nextBlock}</Link></td></tr>
                        <tr><td className="tdLabel">Current World Population: </td><td>{this.state.currentWorldPopulation}</td></tr>
                        <tr><td className="tdLabel">New Registered People: </td><td>{this.state.newRegisteredPeople}</td></tr>
                        <tr><td className="tdLabel">Total Community People: </td><td>{this.state.totalCommunityPeople}</td></tr>
                        <tr><td className="tdLabel">World Wallet Amount: </td><td>{this.state.worldWalletAmount}</td></tr>
                        <tr><td className="tdLabel">Distribute per Person: </td><td>{this.state.distributePerPerson}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default Block;