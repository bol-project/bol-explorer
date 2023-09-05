import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import JsonRpcClient from 'react-jsonrpc-client'

import './style.css';
import BlockListElement from "./BlockListElement";
import BolDayListElement from "./BolDayListElement";
import TransactionListElement from "./TransactionListElement";
import WorldPopulationElement from "./WorldPopulationElement";
import TotalCommunityElement from "./TotalCommunityElement";
import AccountListElement from "./AccountListElement";
import DistributionListElement from "./DistributionListElement";
import TotalActivity from "./TotalActivity";
import MarketActivity from "./MarketActivity";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import Button from "reactstrap/lib/Button";
import PageHeader from "../PageHeader/PageHeader";
import {Modal} from "reactstrap";

var api = new JsonRpcClient({
    endpoint: process.env.REACT_APP_SERVER_URL           //'https://rpc.bolchain.net',
});
var scriptHash = "49071c33087967cc6d3c0f0ef35c013163b047eb";
var ClaimIntervalStorageKey = "B3";

var BlockRetrievalDestination = {
    "BLOCK_LIST": "BlockList",
    "BOL_DAY_LIST": "BolDayList"
};

class Home extends Component {

    _isMounted = false;
    lastNEntityRows = 5;
    transactionMap = {};
    intervalId = null;

    constructor(props) {
        super(props);
        this.state = {
            blockActivityList: [],
            transactionActivityList: [],
            bolDayActivityList: [],
            showErrorModal: false
        }
    }

    //https://pusher.com/tutorials/consume-restful-api-react
    componentWillMount() {          //the first true life cycle method: called one time, which is before the initial render
        this._isMounted = true;

        this.getWorldPopulationData();
        this.getTotalCommunityData();
        this.getTotalLastDistributionsData();

        this.getClaimInterval().then(() => {
            this.getBlockCount();
        }, () => {
            this.toggleModal("showErrorModal");
            console.log('There was an error contacting the server');
        });
    }

    toggleModal = modalState => {
        this.setState({
            [modalState]: !this.state[modalState]
        });
    };

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.intervalId);
    }

    getClaimInterval() {

        return api.request('getstorage', scriptHash, ClaimIntervalStorageKey).then((response) => {

            if (response && this._isMounted) {

                this.setState({claimInterval: parseInt(response, 16)});
            }
        }).catch(console.log);
    };

    getBlockCount() {

        api.request('getblockcount').then((response) => {

            if (response && this._isMounted) {
                this.setState({blockheight: (response) ? response : 0});
            }
        })
            .then(() => {

                //read transaction data
                this.transactionMap = new Map();
                Array.from(Array(this.lastNEntityRows)).forEach((el, i) => {
                    this.getBlock(this.state.blockheight - i - 1, i, BlockRetrievalDestination.BLOCK_LIST);
                });

                let lastBlockIndex = this.state.blockheight - (this.state.blockheight % this.state.claimInterval);
                Array.from(Array(this.lastNEntityRows)).forEach((el, i) => {

                    this.getBlock((lastBlockIndex) - (i * this.state.claimInterval), i, BlockRetrievalDestination.BOL_DAY_LIST);
                });
            }).catch(error => {
            this.toggleModal("showErrorModal");
            console.log('There was an error contacting the server');
        });
    }

    getBlock(height, arrayIndex, dest) {

        return api.request('getblock', height, 1).then((response) => {

            if (response && this._isMounted) {

                if (BlockRetrievalDestination.BLOCK_LIST === dest) {         //depending on the caller
                    this.updateBlockList(arrayIndex, response);             //the respective list is populated
                } else if (BlockRetrievalDestination.BOL_DAY_LIST === dest) {
                    this.updateBolDayList(arrayIndex, response);
                }

                this.parseTransactions(arrayIndex, (response.tx && response.tx.length) ? response.tx : []);
            }
        });
    };

    parseTransactions(index, newTransactions) {
        this.transactionMap.set(index, newTransactions);
        let transactions = [];

        if (this.transactionMap.size !== this.lastNEntityRows) {           //update last transactions list only once to evade list trembling
            return;
        }

        Array.from(Array(this.lastNEntityRows)).forEach((el, i) => {        //keep from 0 t0 total-size
            if (this.transactionMap.has(i)) {                                        //append in list
                transactions = transactions.concat(this.transactionMap.get(i).slice(0, this.lastNEntityRows - transactions.length));
            }
        });

        this.setState({
            transactionActivityList: transactions.map(tx => <TransactionListElement key={tx.txid} item={tx}/>)
        });
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

    /** Append data on Block list **/
    updateBlockList(arrayIndex, response) {

        this.setState(function (previousState) {

            let newBlockActivityList = previousState.blockActivityList;
            newBlockActivityList[arrayIndex] = <BlockListElement key={response.hash} item={response}/>;

            // used in case of new block arrived and getblock calls are not in order
            let existingBlockLine = previousState.blockActivityList.filter(e => e && (e.key) && e.key === response.hash)[0];
            let existingBlockLineIndex = previousState.blockActivityList.indexOf(existingBlockLine);
            if (existingBlockLine && arrayIndex !== existingBlockLineIndex) {
                newBlockActivityList[existingBlockLineIndex] = undefined;
            }

            return {
                blockActivityList: newBlockActivityList
            };
        });
    }

    /** Append data on Bol day list **/
    updateBolDayList(arrayIndex, response) {

        response.claimInterval = this.state.claimInterval;          //pass already retrieved claimInterval
        this.setState(function (previousState) {

            let newBolDayActivityList = previousState.bolDayActivityList;
            newBolDayActivityList[arrayIndex] = <BolDayListElement key={response.hash} item={response}/>;

            // used in case of new block arrived and getblock calls are not in order
            let existingBlockLine = previousState.bolDayActivityList.filter(e => e && (e.key) && e.key === response.hash)[0];
            let existingBlockLineIndex = previousState.bolDayActivityList.indexOf(existingBlockLine);
            if (existingBlockLine && arrayIndex !== existingBlockLineIndex) {
                newBolDayActivityList[existingBlockLineIndex] = undefined;
            }

            return {
                bolDayActivityList: newBolDayActivityList
            };
        });
    }

    render() {

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

                    <p className="semi-title">Last 5 BOL Days</p>
                    <div className="table-header btn btn-twitter">
                        <Row>
                            <Col sm> <span>Bol day</span></Col>
                            <Col sm> <span>Height</span></Col>
                            <Col sm><span>Size</span></Col>
                            <Col sm><span>Transactions</span></Col>
                            <Col sm><span>Producer</span></Col>
                            <Col sm><span>Timestamp</span></Col>
                        </Row>
                    </div>
                    <div className="table-list">
                        {(this.state.bolDayActivityList && this.state.bolDayActivityList.length) ? this.state.bolDayActivityList : []}
                    </div>
                    <Link to="/boldays/1">
                        <Button color="twitter">See all days</Button>
                    </Link>

                    <Modal
                        modalClassName="modal-mini modal-primary modal-mini"
                        isOpen={this.state.showErrorModal}
                        toggle={() => this.toggleModal("showErrorModal")}>
                        <div className="modal-header justify-content-center">
                            <button
                                className="close"
                                onClick={() => this.toggleModal("showErrorModal")}>
                                <i className="tim-icons icon-simple-remove text-white"/>
                            </button>
                            <div className="modal-profile">
                                <i className="tim-icons icon-settings"/>
                            </div>
                        </div>
                        <div className="modal-body">
                            <p>Error on loading page..</p>
                            <p>Please try again later</p>
                        </div>
                        <div className="modal-footer">
                        </div>
                    </Modal>

                </div>

            </div>
        );
    }
}

export default Home;