import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './style.css';
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import TransactionBlockListElement from "../Home/TransactionBlockListElement";
import JsonRpcClient from "react-jsonrpc-client";

let ps = null;

var api = new JsonRpcClient({
    endpoint: process.env.REACT_APP_SERVER_URL
});
var scriptHash = "49071c33087967cc6d3c0f0ef35c013163b047eb";
var ClaimIntervalStorageKey = "B3";
var CWPStorageKey = "B7";
var TCPStorageKey = "08";
var WorldWalletAmountStorageKey = "B8";
var DistributePerPersonStorageKey = "B4";

class Block extends Component {

    _isMounted = false;

    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        this._isMounted = true;

        this.getClaimInterval().then(() => {

            this.getBlock().then(() => {

                this.getPreviousBlock();
            });
        }).catch(console.log);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidUpdate(prevProps) {
        if(prevProps.location.pathname !== this.props.location.pathname) {   //Used in case an internal redirect occurs
            window.location.reload();                                       //for new block height on the search bar
        }
    }

    getClaimInterval() {

        return api.request('getstorage', scriptHash, ClaimIntervalStorageKey).then((response) => {

            if (response && this._isMounted) {

                this.setState({claimInterval: parseInt(response, 16)});
            }
        });
    }

    getBlock() {

        let blockIdentifier = (this.props.match.params.blockHash) ?     //block identifier varies depending on the given params
            this.props.match.params.blockHash : parseInt(this.props.match.params.blockHeight);  // /block/:blockHash
        return api.request('getblock', blockIdentifier, 1).then((response) => {                 // /blockByHeight/:blockHeight

            if (response && this._isMounted) {
                this.setState({
                    blockHash: response.hash,
                    blockHeight: response.index,
                    time: response.time,
                    bolDay: (parseInt(response.index/this.state.claimInterval, 10)),       //int(blockHeight/ClainInterval)
                    nextconsensus: response.nextconsensus,
                    size: response.size,
                    nrRegisterTransactions: '',
                    version: response.version,
                    invocationScript: (response.script && response.script.invocation) ? response.script.invocation : '',
                    verificationScript: (response.script && response.script.verification) ? response.script.verification : '',
                    numberOfTransactions: (response.tx && response.tx.length) ? response.tx.length : 0,
                    transactionBlockActivityList: response.tx.map(item => <TransactionBlockListElement key={item.txid}
                                                                                                       item={item}/>),
                    merkleRoot: response.merkleroot,
                    previousBlockHash: response.previousblockhash,
                    nextBlockHash: response.nextblockhash
                });


                if(this.state.claimInterval && this.state.blockHeight % this.state.claimInterval === 0){

                    this.getCWP();                                              //interval block
                    this.getTCP().then(() => {
                        this.getNewRegisteredPeople();
                    });
                    this.getWorldWalletAmount();
                    this.getDistributePerPerson();

                } else {                                                        //plain block

                    let unavailableAtInterval = "Available at the end of each interval"
                    this.setState({
                        cwp: unavailableAtInterval,
                        tcp: unavailableAtInterval,
                        newRegisteredPeople: unavailableAtInterval,
                        worldWalletAmount: unavailableAtInterval,
                        distributePerPerson: unavailableAtInterval
                    });
                }

            }
        });
    }

    getPreviousBlock() {

        return api.request('getblock', this.state.blockHeight - 1, 1).then((response) => {

            if (response && this._isMounted) {
                let currentBlockDate = new Date(0);
                currentBlockDate.setUTCSeconds(this.state.time);
                let previousBlockDate = new Date(0);
                previousBlockDate.setUTCSeconds(response.time);

                this.setState({
                    blockTime: Math.abs(currentBlockDate.getTime() - previousBlockDate.getTime())/1000
                });
            }
        });
    }

    getCWP() {
        let blockKey = this.reverseHex(this.addLeadingZeros(this.toBase16(this.state.blockHeight)));
        api.request('getstorage', scriptHash, CWPStorageKey + blockKey).then((response) => {

            if (response && this._isMounted) {
                this.setState({cwp: this.bigIntegerToInt(this.toBase10(this.reverseHex(response)), 8)})
            }
        });
    }

    getTCP() {

        return this.getTCPByBlockHeight(this.state.blockHeight).then((response) => {

            if (response && this._isMounted) {
                this.setState({tcp: this.toBase10(this.reverseHex(response))});
            }
        });
    }

    getNewRegisteredPeople() {

        this.getTCPByBlockHeight(this.state.blockHeight - this.state.claimInterval).then((response) => {

            if (response && this._isMounted) {
                this.setState({newRegisteredPeople: this.state.tcp - this.toBase10(this.reverseHex(response))});
            }
        });
    }

    getWorldWalletAmount() {

        let blockKey = this.reverseHex(this.addLeadingZeros(this.toBase16(this.state.blockHeight)));
        api.request('getstorage', scriptHash, WorldWalletAmountStorageKey + blockKey).then((response) => {

            if (response && this._isMounted) {
                this.setState({worldWalletAmount: this.bigIntegerToInt(this.toBase10(this.reverseHex(response)), 4)});
            }
        });
    }

    getDistributePerPerson() {

        let blockKey = this.reverseHex(this.addLeadingZeros(this.toBase16(this.state.blockHeight)));
        api.request('getstorage', scriptHash, DistributePerPersonStorageKey + blockKey).then((response) => {

            if (response && this._isMounted) {
                this.setState({distributePerPerson: this.bigIntegerToInt(this.toBase10(this.reverseHex(response)), 4)});
            }
        });
    }

    getTCPByBlockHeight(height) {

        let blockKey = this.reverseHex(this.addLeadingZeros(this.toBase16(height)));
        return api.request('getstorage', scriptHash, TCPStorageKey + blockKey);
    }

    toBase16(num) {
        return num.toString(16);
    }

    toBase10(str) {
        return parseInt(str, 16)
    }

    bigIntegerToInt(str, decimalPart) {
        return Math.floor(Number(str/Math.pow(10, decimalPart)));
    }

    addLeadingZeros(numStr) {
        return (numStr && numStr.length % 2 === 0) ? numStr : '0' + numStr;
    }

    reverseHex(numStr) {
        let reversedNumStr = [];
        for(var i = 0; i < numStr.length; i+=2){
            reversedNumStr.push(numStr[i] + numStr[i+1]);
        }
        return reversedNumStr.reverse().join('');
    }

    render() {

        var dtFormat = Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        return (
            <div className="view-page">
                <div className="Block">
                    <h2>Block Info</h2>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td className="tdLabel">Block Hash:</td>
                                <td>{this.state.blockHash}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Block Height:</td>
                                <td>{this.state.blockHeight}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Date:</td>
                                <td>{(!this.state.time) ? '' :
                                    dtFormat.format(new Date(0).setUTCSeconds(this.state.time))}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">BOL Day:</td>
                                <td>{this.state.bolDay}</td>
                            </tr>
                            {/*<tr>*/}
                            {/*    <td className="tdLabel">CWP:</td>*/}
                            {/*    <td>{this.state.cwp}</td>*/}
                            {/*</tr>*/}
                            <tr>
                                <td className="tdLabel">Size:</td>
                                <td>{this.state.size}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Nr. of Register Transactions:</td>
                                <td>{this.state.nrRegisterTransactions}</td>
                            </tr>
                            {/*<tr>*/}
                            {/*    <td className="tdLabel">New Registered People:</td>*/}
                            {/*    <td>{this.state.newRegisteredPeople}</td>*/}
                            {/*</tr>*/}
                            <tr>
                                <td className="tdLabel">Previous Block:</td>
                                <td><Link to={`../block/${this.state.previousBlockHash}`}
                                          onClick={this.forceUpdate}>{this.state.previousBlockHash}</Link></td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Merkle Root:</td>
                                <td>{this.state.merkleRoot}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Block Producer:</td>
                                <td>{this.state.nextconsensus}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Version:</td>
                                <td>{this.state.version}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Invocation Script:</td>
                                <td>{this.state.invocationScript}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Verification Script:</td>
                                <td>{this.state.verificationScript}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Block Time:</td>
                                <td>{this.state.blockTime} sec</td>
                            </tr>
                            {/*<tr>*/}
                            {/*    <td className="tdLabel">TCP:</td>*/}
                            {/*    <td>{this.state.tcp}</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td className="tdLabel">World Wallet Amount:</td>*/}
                            {/*    <td>{this.state.worldWalletAmount}</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td className="tdLabel">Distribute per Person:</td>*/}
                            {/*    <td>{this.state.distributePerPerson}</td>*/}
                            {/*</tr>*/}
                            <tr>
                                <td className="tdLabel">Next Block:</td>
                                <td><Link to={`../block/${this.state.nextBlockHash}`}>{this.state.nextBlockHash}</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Number of Transactions:</td>
                                <td>{this.state.numberOfTransactions}</td>
                            </tr>

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
                    {this.state.transactionBlockActivityList}

                </div>
            </div>
        );
    }
}

export default Block;