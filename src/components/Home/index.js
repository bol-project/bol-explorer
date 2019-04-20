import React, { Component } from 'react';
import Web3 from 'web3';
import _ from 'lodash';
import { Link } from 'react-router-dom'

import './style.css';
import BlockListElement from "./BlockListElement";
import TransactionListElement from "./TransactionListElement";
import TotalActivity from "./TotalActivity";
import MarketActivity from "./MarketActivity";

// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var web3 = new Web3(new Web3.providers.HttpProvider('https://api.neoscan.io/api/main_net/v1/get_address_abstracts/'));

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            block_ids: [],
            block_hashes: [],
            curr_block: null
        }
    }

    componentWillMount() {          //the first true life cycle method: called one time, which is before the initial render


       // var curr_block_no = web3.eth.blockNumber;
      //  console.log(curr_block_no);
      //  this.setState({
      //      curr_block: curr_block_no
      //  });

      //  this.getBlocks(curr_block_no);
    }

    getBlocks(curr_block_no) {
        const block_ids = this.state.block_ids.slice();
        const block_hashes = this.state.block_hashes.slice();
        var max_blocks = 10;
        if (curr_block_no < max_blocks) max_blocks = curr_block_no;
        for (var i = 0; i < max_blocks; i++, curr_block_no--) {
            var currBlockObj = web3.eth.getBlock(curr_block_no);
            block_ids.push(currBlockObj.number);
            block_hashes.push(currBlockObj.hash);
        }
        this.setState({
            block_ids: block_ids,
            block_hashes: block_hashes
        })
    }

    render() {

        var transactionActivityRows = [];
        _.each(this.state.block_ids, (value, index) => {
            transactionActivityRows.push(
                <tr key={this.state.block_hashes[index]}>
                    <td className="tdCenter">{this.state.block_ids[index]}</td>
                    <td><Link to={`/block/${this.state.block_hashes[index]}`}>{this.state.block_hashes[index]}</Link></td>
                </tr>
            )
        });
        var transactionActivityData = [{type: 'Invocation', transactionId: '50b9ccaef0f9306eba1b34fbd9a66aa1365dbf8b9b9085e206310eff458db370', completedOn: 1551338586},
            {type: 'Invocation', transactionId: '13e5c967c76158f4ea197094f4e7fd47ad2165f223f4131564aa6e4bcb34a069', completedOn: 1551338586},
            {type: 'Invocation', transactionId: 'd75d22aa4fe1788e201db2f191a0459285d072ca423e429a51e6d26e2f61c3d4', completedOn: 1551338586},
            {type: 'Invocation', transactionId: 'ada996ad33ad98fbe3524e2b46e7bff3d4e3952f37c20ec273350d9a5eae70bb', completedOn: 1551338586},
            {type: 'Invocation', transactionId: '4d84ba1b1f9003d121fd2480420e3d36b3451d0fbb9806fde6dd62f23294ba38', completedOn: 1551338586}];
        this.state.transactionActivityList = transactionActivityData.map(item => <TransactionListElement key={item.transactionId} item={item}/>)


        var blockActivityData = [{index: 1, size: 1526, version: 1, hash: '1', time: 1551338586},
            {index: 1, size: 1526, version: 1, hash: '2', time: 1551338587}, {index: 1, size: 1526, version: 1, hash: '3', time: 1551338588},
            {index: 1, size: 2232, version: 1, hash: '4', time: 1551338583}, {index: 1, size: 3426, version: 1, hash: '5', time: 1551338588}];
        this.state.blockActivityList = blockActivityData.map(item => <BlockListElement key={item.hash} item={item}/>)

        return (
            <div className="Home">

                <TotalActivity totalTransactions="889,333,158" totalBlocks="343,556,339" totalWalletAddresses="339.765.332"/>

                <br/>
                <br/>
                <MarketActivity neoCoinPrice="$8.99" currentMarketCap="$152,222,588" last24HourChange="1.32%" last24HourVolume="$554,345,312"/>

                <br/>
                <br/>
                Last 5 Transactions
                <div className="table-list">
                    {this.state.transactionActivityList}
                </div>
                <Link to="/transactions/1">See all transactions</Link>

                <br/>
                <br/>
                Last 5 Blocks
                <div className="table-list">
                    {this.state.blockActivityList}
                </div>
                <Link to="/blocks/1">See all blocks</Link>


            </div>
        );
    }
}

export default Home;