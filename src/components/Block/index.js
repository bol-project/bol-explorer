import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './style.css';

// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var blockUrl = "https://api.neoscan.io/api/main_net/v1/get_block/";

class Block extends Component {

    constructor() {
        super();

        this.state = {

        };


    }

    componentWillMount() {

        // Get the block hash from URL arguments (defined by Route pattern)
        var block_hash = this.props.match.params.blockHash;
        this.getBlockState(block_hash);
    }

    componentWillReceiveProps(nextProps) {

        var block_hash_old = this.props.match.params.blockHash;
        var block_hash_new = nextProps.match.params.blockHash;

        // compare old and new URL parameter (block hash)
        // if different, reload state using web3
        if (block_hash_old !== block_hash_new)
            this.getBlockState(block_hash_new);
    }

   getBlockState(block_hash) {

        console.log("Block hash is : " + block_hash);
        axios.get(blockUrl + "/" + block_hash)      // Use axios to get the Block object
            .then(result =>  {

                console.log("Block is : " + JSON.stringify(result));
                // Set the Component state
                this.setState({
                    version: result.data.version,
                    tx_count: result.data.tx_count,
                    transfers: result.data.transfers,
                    transactions: result.data.transactions,
                    time:  Date(parseInt(result.data.time, 10)).toString(),
                    size: result.hash,
                    script: result.data.script,
                    previousblockhash: result.data.previousblockhash,
                    nonce: result.data.nonce,
                    nextconsensus: result.data.nextconsensus,
                    nextblockhash: result.data.nextblockhash,
                    merkleroot: result.data.merkleroot,
                    index: result.data.index,
                    hash: result.data.hash,
                    confirmations: result.data.confirmations,
                    block: result.data
                });

            })
            .catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    render() {

        console.log("state is : " + JSON.stringify(this.state));

       // const block = this.state.block;
     //   const difficulty = parseInt(block.difficulty, 10);
     //   const difficultyTotal = parseInt(block.totalDifficulty, 10);
        return (
            <div className="Block">
                <h2>Block Info</h2>
                <div>
                    <table>
                        <tbody>

                        <tr><td className="tdLabel">version: </td><td>{this.state.version}</td></tr>
                        <tr><td className="tdLabel">tx_count: </td><td>{this.state.tx_count}</td></tr>
                        <tr><td className="tdLabel">transfers: </td><td>{this.state.transfers}</td></tr>
                        <tr><td className="tdLabel">transactions: </td><td>{this.state.transactions}</td></tr>
                        <tr><td className="tdLabel">time: </td><td>{this.state.time}</td></tr>
                        <tr><td className="tdLabel">size: </td><td>{this.state.size}</td></tr>
                        <tr><td className="tdLabel">previousblockhash: </td>
                            <td><Link to={`../block/${this.state.previousblockhash}`}>{this.state.previousblockhash}</Link></td></tr>
                        <tr><td className="tdLabel">nonce: </td><td>{this.state.nonce}</td></tr>
                        <tr><td className="tdLabel">nextconsensus: </td><td>{this.state.nextconsensus}</td></tr>
                        <tr><td className="tdLabel">nextblockhash: </td>
                            <td><Link to={`../block/${this.state.nextblockhash}`}>{this.state.nextblockhash}</Link></td></tr>
                        <tr><td className="tdLabel">merkleroot: </td><td>{this.state.merkleroot}</td></tr>
                        <tr><td className="tdLabel">index: </td><td>{this.state.index}</td></tr>
                        <tr><td className="tdLabel">hash: </td><td>{this.state.hash}</td></tr>
                        <tr><td className="tdLabel">confirmations: </td><td>{this.state.confirmations}</td></tr>

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default Block;