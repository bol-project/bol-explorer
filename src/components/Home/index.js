import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom'
import JsonRpcClient from 'react-jsonrpc-client'

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
import PageHeader from "../PageHeader/PageHeader";
import {Card, CardBody} from "reactstrap";
import {Line} from "react-chartjs-2";
import bigChartData from "variables/charts.jsx";

var api = new JsonRpcClient({
    endpoint: process.env.REACT_APP_SERVER_URL           //'https://rpc.bolchain.net',
});

class Home extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            blockActivityList: []
        }
    }

    //https://pusher.com/tutorials/consume-restful-api-react
    componentWillMount() {          //the first true life cycle method: called one time, which is before the initial render
        this._isMounted = true;

        this.getTransactions();
        this.getWorldPopulationData();
        this.getTotalCommunityData();
        this.getTotalLastDistributionsData();

        this.getBlockCount();
        setInterval(() => {
            this.getBlockCount();
        }, 5000);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getBlockCount() {

        api.request('getblockcount').then((response) => {

            if (response && this._isMounted) {
                this.setState({blockheight: (response) ? response : 0});
            }
        })
        .then(() => {

            Array.from(Array(5)).forEach((el, i) => {
                this.getBlock(this.state.blockheight - i - 1, i);
            });
        })
    }

    getBlock(height, arrayIndex) {

        return api.request('getblock', height, 1).then((response) => {

            if (response && this._isMounted) {

                this.setState(function (previousState) {

                    let newBlockActivityList = previousState.blockActivityList;
                    newBlockActivityList[arrayIndex] = <BlockListElement key={response.hash} item={response}/>;

                    // used in case of new block arrived and getblock calls are not in order
                    let existingBlockLine = previousState.blockActivityList.filter(e => e && (e.key) && e.key === response.hash)[0];
                    let existingBlockLineIndex = previousState.blockActivityList.indexOf(existingBlockLine);
                    if (existingBlockLine && arrayIndex != existingBlockLineIndex) {
                        newBlockActivityList[existingBlockLineIndex] = undefined;
                    }

                    return {
                        blockActivityList: newBlockActivityList
                    };
                });
            }
        });
    }


    getTransactions() {
        // fetch('http://localhost:5000/api/transactions?Page=1&PageSize=5')
        fetch('http://localhost:5000/api/transactions')
            .then(res => res.json())
            .then((data) => {                   //remove 0 index of OK result and parse data to component
                this.setState({
                    transactionActivityList: data.map(item => <TransactionListElement key={item.hash} item={item}/>)
                })
            })
            .catch(console.log)
    }

    getWorldPopulationData() {
        fetch('https://5da3147176c28f0014bbe6f4.mockapi.io/worldPopulation1')
            .then(res => res.json())
            .then((data) => {                   //remove 0 index of OK result and keep only the 5 first
                this.setState({
                    worldPopulationDataList: (data.slice(1)).slice(0, 5).map(item => <WorldPopulationElement
                        key={item.id} item={item}/>)
                })
            })
            .catch(console.log)
    }

    getTotalCommunityData() {
        fetch('https://5da3147176c28f0014bbe6f4.mockapi.io/communityPeople1')
            .then(res => res.json())
            .then((data) => {                   //remove 0 index of OK result and keep only the 5 first
                this.setState({
                    totalCommunityDataList: (data.slice(1)).slice(0, 5).map(item => <TotalCommunityElement key={item.id}
                                                                                                           item={item}/>)
                })
            })
            .catch(console.log)
    }

    getTotalLastDistributionsData() {
        fetch('https://5d8313cdc9e3410014070ff8.mockapi.io/v1/distributePerPerson1')
            .then(res => res.json())
            .then((data) => {                    //remove 0 index of OK result and keep only the 5 first
                this.setState({
                    totalLastDistributionsDataList: (data.slice(1)).slice(0, 5).map(item => <DistributionListElement
                        key={item.id} item={item}/>)
                })
            })
            .catch(console.log)
    }

    render() {

        var transactionActivityRows = [];
        _.each(this.state.block_ids, (value, index) => {
            transactionActivityRows.push(
                <tr key={this.state.block_hashes[index]}>
                    <td className="tdCenter">{this.state.block_ids[index]}</td>
                    <td><Link to={`/block/${this.state.block_hashes[index]}`}>{this.state.block_hashes[index]}</Link>
                    </td>
                </tr>
            )
        });

        var totalAccountsData = [{accountHash: 1, codename: 'myAccount1'}, {
            accountHash: 2,
            codename: 'myAccount2'
        }, {accountHash: 3, codename: 'myAccount3'},
            {accountHash: 4, codename: 'myAccount4'}, {accountHash: 5, codename: 'myAccount5'}];
        this.state.totalAccountsDataList = totalAccountsData.map(item => <AccountListElement key={item.accountHash}
                                                                                             item={item}/>)
        return (
            <div>
                <PageHeader/>

                <div className="home">
                    <TotalActivity totalTransactions="889,333,158" totalBlocks={this.state.blockheight}
                                   totalWalletAddresses="339.765.332"/>

                    <br/>
                    <br/>
                    <MarketActivity neoCoinPrice="$8.99" currentMarketCap="$152,222,588" last24HourChange="1.32%"
                                    last24HourVolume="$554,345,312"/>

                    <br/>
                    <br/>
                    <p className="semi-title">BOL Chain Progress</p>
                    <section className="section-lg">
                        <Col md="12">
                            <Card className="card-chart card-plain">
                                <CardBody>
                                    <div className="chart-area">
                                        <Line
                                            data={bigChartData.data}
                                            options={bigChartData.options}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </section>

                    <br/>
                    <br/>
                    <p className="semi-title">Last 5 Transactions</p>
                    <div className="table-header btn btn-twitter ">
                        <Row>
                            <Col sm> <span>Transaction Type</span></Col>
                            <Col sm><span>Transaction ID</span></Col>
                            <Col sm><span>Timestamp</span></Col>
                        </Row>
                    </div>
                    <div className="table-list">
                        {this.state.transactionActivityList}
                    </div>
                    <Link to="/transactions/1">
                        <Button color="twitter">See all transactions</Button>
                    </Link>

                    <br/>
                    <br/>
                    <p className="semi-title">Last 5 Blocks</p>
                    <div className="table-header btn btn-twitter">
                        <Row>
                            <Col sm> <span>Height</span></Col>
                            <Col sm><span>Size</span></Col>
                            <Col sm><span>Transactions</span></Col>
                            <Col sm><span>Producer</span></Col>
                            <Col sm><span>Timestamp</span></Col>
                        </Row>
                    </div>
                    <div className="table-list">
                        {(this.state.blockActivityList && this.state.blockActivityList.length) ? this.state.blockActivityList : []}
                    </div>
                    <Link to="/blocks/1">
                        <Button color="twitter">See all blocks</Button>
                    </Link>

                    <br/>
                    <br/>

                    <p className="semi-title">WP</p>
                    <div className="table-header btn btn-twitter">
                        <Row>
                            <Col sm> <span>D</span></Col>
                            <Col sm><span>P</span></Col>
                        </Row>
                    </div>
                    <div className="table-list">
                        {this.state.worldPopulationDataList}
                    </div>
                    <Link to="/WPD/1">
                        <Button color="twitter">To all days</Button>
                    </Link>

                    <br/>
                    <br/>

                    <p className="semi-title">TCP</p>
                    <div className="table-header btn btn-twitter">
                        <Row>
                            <Col sm> <span>D</span></Col>
                            <Col sm><span>C</span></Col>
                        </Row>
                    </div>
                    <div className="table-list">
                        {this.state.totalCommunityDataList}
                    </div>
                    <Link to="/TCP/1">
                        <Button color="twitter">To all days</Button>
                    </Link>

                    <br/>
                    <br/>

                    <p className="semi-title">Total Accounts</p>
                    <div className="table-header btn btn-twitter">
                        <Row>
                            <Col sm> <span>Human accounts</span></Col>
                            <Col sm><span>Company and institute accounts</span></Col>
                        </Row>
                    </div>
                    <div className="table-list">
                        {this.state.totalAccountsDataList}
                    </div>
                    <Link to="/accounts/1">
                        <Button color="twitter">To all accounts</Button>
                    </Link>

                    <p className="semi-title">LDDPP</p>
                    <div className="table-header btn btn-twitter">
                        <Row>
                            <Col sm> <span>P</span></Col>
                            <Col sm><span>D</span></Col>
                        </Row>
                    </div>
                    <div className="table-list">
                        {this.state.totalLastDistributionsDataList}
                    </div>
                    <Link to="/D/1">
                        <Button color="twitter">To all d</Button>
                    </Link>
                </div>

            </div>
        );
    }
}

export default Home;