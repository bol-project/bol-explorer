import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import './style.css';
import BolDayListElement from "../Home/BolDayListElement";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import JsonRpcClient from "react-jsonrpc-client";

var api = new JsonRpcClient({
    endpoint: process.env.REACT_APP_SERVER_URL           //'https://rpc.bolchain.net',
});
var scriptHash = "49071c33087967cc6d3c0f0ef35c013163b047eb";
var ClaimIntervalStorageKey = "B3";
var pageSize = 25;

class BolDays extends Component {

    _isMounted = false;

    constructor() {
        super();
        this.state = {
            bolDayActivityList: []
        };
    }

    componentWillMount() {          //the first true life cycle method: called one time, which is before the initial render
        this._isMounted = true;
        if (this.props.match.params.page <= 0) {
            return;
        }

        this.getClaimInterval().then(() => {

            this.getBlockCount().then(() => {});
        });

    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    getClaimInterval() {

        return api.request('getstorage', scriptHash, ClaimIntervalStorageKey).then((response) => {

            if (response && this._isMounted) {

                this.setState({claimInterval: parseInt(response, 16)});
            }
        });
    };

    getBlockCount() {

        return api.request('getblockcount').then((response) => {

            if (response && this._isMounted) {
                this.setState({blockheight: response});
            }
        })
        .then(() => {

            let lastBlockIndex = this.state.blockheight - (this.state.blockheight % this.state.claimInterval);
            Array.from(Array(pageSize)).forEach((el, i) => {    //paging

                let pageIndex = (lastBlockIndex) - (i * this.state.claimInterval) -
                    (this.props.match.params.page - 1) * pageSize;

                if (this.props.match.params.page <=                     //max page overflow and negative positions
                    Math.ceil((lastBlockIndex/this.state.claimInterval) / pageSize) && pageIndex >= 0) {
                    this.getBlock(pageIndex, i);
                }
            });
        })
    };

    getBlock(height, arrayIndex) {

        return api.request('getblock', height, 1).then((response) => {

            if (response && this._isMounted) {

                response.claimInterval = this.state.claimInterval;          //pass already retrieved claimInterval
                this.setState(function (previousState) {

                    let newBolDayActivityList = previousState.bolDayActivityList;
                    newBolDayActivityList[arrayIndex] = <BolDayListElement key={response.hash} item={response}/>;

                    // used in case of new block arrived and getblock calls are not in order
                    let existingBlockLine = previousState.bolDayActivityList.filter(e => e && (e.key) && e.key === response.hash)[0];
                    let existingBlockLineIndex = previousState.bolDayActivityList.indexOf(existingBlockLine);
                    if (existingBlockLine && arrayIndex != existingBlockLineIndex) {
                        newBolDayActivityList[existingBlockLineIndex] = undefined;
                    }

                    return {
                        bolDayActivityList: newBolDayActivityList
                    };
                });
            }
        });
    }

    render() {
        return (
            <div className="view-page">
                <h1>All Bol Days</h1>

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
                <br/>
                <br/>
                <Link className={((parseInt(this.props.match.params.page) > 1) ? '' : 'invisible')}
                      to={`/boldays/${parseInt(this.props.match.params.page) - 1}`}
                      onClick={this.forceUpdate}>Previous</Link>
                <span> </span>
                <Link to={`/boldays/${parseInt(this.props.match.params.page) + 1}`}
                      onClick={this.forceUpdate}>Next</Link>

            </div>
        );
    }

}


export default BolDays;