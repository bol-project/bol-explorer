import React, { Component } from 'react';
import Web3 from 'web3';
import _ from 'lodash';
import { Link } from 'react-router-dom'

import './style.css';
import BlockListElement from "./BlockListElement";
import TransactionListElement from "./TransactionListElement";
import WorldPopulationElement from "./WorldPopulationElement";
import TotalCommunityElement from "./TotalCommunityElement";
import AccountListElement from "./AccountListElement";
import DistributionListElement from "./DistributionListElement";
import TotalActivity from "./TotalActivity";
import MarketActivity from "./MarketActivity";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Button from "reactstrap/es/Button";

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


        var blockActivityData = [{height: 33, size: 1526, transactions: 4433, producer: '3232321fdsfsd544fdfsd', hash: '1', time: 1551338586},
            {height: 343, size: 1526, transactions: 1, producer: '3232321fdsfsd544fdfsd', hash: '2', time: 1551338587}, {height: 1, size: 1526, transactions: 1, producer: '3232321fdsfsd544fdfsd', hash: '3', time: 1551338588},
            {height: 2223432, size: 2232, transactions: 1, producer: '3232321fdsfsd544fdfsd', hash: '4', time: 1551338583}, {height: 1, size: 3426, transactions: 1, producer: '3232321fdsfsd544fdfsd', hash: '5', time: 1551338588}];
        this.state.blockActivityList = blockActivityData.map(item => <BlockListElement key={item.hash} item={item}/>)

        var worldPopulationData = [{dayId: 1, day: '01/01/2019', population: 10}, {dayId: 2, day: '01/02/2019', population: 12},
            {dayId: 3, day: '01/03/2019', population: 88}, {dayId: 4, day: '01/04/2019', population: 7055}, {dayId: 5, day: '01/05/2019', population: 551},
            {dayId: 6, day: '01/06/2019', population: 888}, {dayId: 7, day: '01/07/2019', population: 1001}, {dayId: 8, day: '01/08/2019', population: 1200},
            {dayId: 9, day: '01/09/2019', population: 1500}, {dayId: 10, day: '01/10/2019', population: 1909}, {dayId: 11, day: '01/11/2019', population: 5001},
            {dayId: 12, day: '01/12/2019', population: 1996}, {dayId: 13, day: '01/13/2019', population: 90668}, {dayId: 14, day: '01/14/2019', population: 10996},
            {dayId: 15, day: '01/15/2019', population: 70258}, {dayId: 16, day: '01/16/2019', population: 99366}, {dayId: 17, day: '01/17/2019', population: 1000580},
            {dayId: 18, day: '01/18/2019', population: 999999}, {dayId: 19, day: '01/19/2019', population: 1000025}, {dayId: 20, day: '01/20/2019', population: 9000000}];
        this.state.worldPopulatonDataList = worldPopulationData.map(item => <WorldPopulationElement key={item.dayId} item={item}/>)

        var totalCommunityData = [{dayId: 1, day: '01/01/2019', community: 10}, {dayId: 2, day: '01/02/2019', community: 12},
            {dayId: 3, day: '01/03/2019', community: 88}, {dayId: 4, day: '01/04/2019', community: 7055}, {dayId: 5, day: '01/05/2019', community: 551},
            {dayId: 6, day: '01/06/2019', community: 888}, {dayId: 7, day: '01/07/2019', community: 1001}, {dayId: 8, day: '01/08/2019', community: 1200},
            {dayId: 9, day: '01/09/2019', community: 1500}, {dayId: 10, day: '01/10/2019', community: 1909}, {dayId: 11, day: '01/11/2019', community: 5001},
            {dayId: 12, day: '01/12/2019', community: 1996}, {dayId: 13, day: '01/13/2019', community: 90668}, {dayId: 14, day: '01/14/2019', community: 10996},
            {dayId: 15, day: '01/15/2019', community: 70258}, {dayId: 16, day: '01/16/2019', community: 99366}, {dayId: 17, day: '01/17/2019', community: 1000580},
            {dayId: 18, day: '01/18/2019', community: 999999}, {dayId: 19, day: '01/19/2019', community: 1000025}, {dayId: 20, day: '01/20/2019', community: 9000000}];
        this.state.totalCommunityDataList = totalCommunityData.map(item => <TotalCommunityElement key={item.dayId} item={item}/>)

        var totalAccountsData = [{accountHash: 1, codename: 'myAccount1'}, {accountHash: 2, codename: 'myAccount2'}, {accountHash: 3, codename: 'myAccount3'},
            {accountHash: 4, codename: 'myAccount4'}, {accountHash: 5, codename: 'myAccount5'}, {accountHash: 6, codename: 'myAccount6'}, {accountHash: 7, codename: 'myAccount7'},
            {accountHash: 8, codename: 'myAccount8'}, {accountHash: 9, codename: 'myAccount9'}, {accountHash: 10, codename: 'myAccount10'}, {accountHash: 11, codename: 'myAccount11'},
            {accountHash: 12, codename: 'myAccount12'}, {accountHash: 13, codename: 'myAccount13'}, {accountHash: 14, codename: 'myAccount14'}, {accountHash: 15, codename: 'myAccount15'},
            {accountHash: 16, codename: 'myAccount16'}, {accountHash: 17, codename: 'myAccount17'}, {accountHash: 18, codename: 'myAccount18'}, {accountHash: 19, codename: 'myAccount19'},
            {accountHash: 20, codename: 'myAccount20'}];
        this.state.totalAccountsDataList = totalAccountsData.map(item => <AccountListElement key={item.accountHash} item={item}/>)

        var totalLastDistributionsData = [{personId: 1, day: '01/04/2019'}, {personId: 1, day: '01/04/2019'}, {personId: 1, day: '01/04/2019'}, {personId: 1, day: '01/04/2019'}];
        this.state.totalLastDistributionsDataList = totalLastDistributionsData.map(item => <DistributionListElement key={item.personId} item={item}/>)

        return (
            <div className="Home">

                <TotalActivity totalTransactions="889,333,158" totalBlocks="343,556,339" totalWalletAddresses="339.765.332"/>

                <br/>
                <br/>
                <MarketActivity neoCoinPrice="$8.99" currentMarketCap="$152,222,588" last24HourChange="1.32%" last24HourVolume="$554,345,312"/>

                <br/>
                <br/>
                <p class="semi-title">Last 5 Transactions</p>
                <div class="table-header btn btn-info">
                    <Row>
                        <Col sm> <span>Transaction Type</span></Col>
                        <Col sm><span>Transaction ID</span></Col>
                        <Col sm><span>Timestamp</span></Col>
                    </Row>
                </div>
                <div className="table-list" >
                    {this.state.transactionActivityList}
                </div>
                <Link to="/transactions/1">
                    <Button color="info">See all transactions</Button>
                </Link>

                <br/>
                <br/>
                <p  class="semi-title">Last 5 Blocks</p>
                <div className="table-header btn btn-info">
                    <Row>
                        <Col sm> <span>Height</span></Col>
                        <Col sm><span>Size</span></Col>
                        <Col sm><span>Transactions</span></Col>
                        <Col sm><span>Producer</span></Col>
                        <Col sm><span>Timestamp</span></Col>
                    </Row>
                </div>
                <div className="table-list">
                    {this.state.blockActivityList}
                </div>
                <Link to="/blocks/1">
                    <Button color="info">See all blocks</Button>
                </Link>

                <br/>
                <br/>

                <p class="semi-title">World Population by day</p>
                <div className="table-header btn btn-info">
                    <Row>
                        <Col sm> <span>Day</span></Col>
                        <Col sm><span>Population</span></Col>
                    </Row>
                </div>
                <div className="table-list">
                    {this.state.worldPopulatonDataList}
                </div>
                <Link to="/worldPopulationDays/1">
                    <Button color="info">To all days</Button>
                </Link>

                <br/>
                <br/>

                <p  class="semi-title">Total Community People</p>
                <div className="table-header btn btn-info">
                    <Row>
                        <Col sm> <span>Day</span></Col>
                        <Col sm><span>Community</span></Col>
                    </Row>
                </div>
                <div className="table-list">
                    {this.state.totalCommunityDataList}
                </div>
                <Link to="/totalCommunityDays/1">
                    <Button color="info">To all days</Button>
                </Link>

                <br/>
                <br/>

                <p  class="semi-title">Total Accounts</p>
                <div className="table-header btn btn-info">
                    <Row>
                        <Col sm> <span>Human accounts</span></Col>
                        <Col sm><span>Company and institute accounts</span></Col>
                    </Row>
                </div>
                <div className="table-list">
                    {this.state.totalAccountsDataList}
                </div>
                <Link to="/accounts/1">
                    <Button color="info">To all accounts</Button>
                </Link>

                <p className="semi-title">Last Day Distribute Per Person</p>
                <div className="table-header btn btn-info">
                    <Row>
                        <Col sm> <span>Person</span></Col>
                        <Col sm><span>Day</span></Col>
                    </Row>
                </div>
                <div className="table-list">
                    {this.state.totalLastDistributionsDataList}
                </div>
                <Link to="/distributions/1">
                    <Button color="info">To all distributions</Button>
                </Link>

            </div>
        );
    }
}

export default Home;