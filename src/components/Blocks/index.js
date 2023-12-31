import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import './style.css';
import BlockListElement from "../Home/BlockListElement";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import JsonRpcClient from "react-jsonrpc-client";

var api = new JsonRpcClient({
    endpoint: process.env.REACT_APP_SERVER_URL           //'https://rpc.bolchain.net',
});
var pageSize = 25;

class Blocks extends Component {

    constructor() {
        super();
        this.state = {
            blockActivityList: []
        };
    }

    componentDidUpdate (nextProps) {
        if(this.props.match.params.page === nextProps.match.params.page){
            return;
        }
        this.setState({ blockActivityList: [] });
        this.getBlockCount();
     }

    componentDidMount() {         
        if (this.props.match.params.page <= 0) {
            return;
        }

        this.getBlockCount();
    }

    getBlockCount() {
        api.request('getblockcount').then((response) => {

            if (response) {
                this.setState({blockheight: response});
            }
        })
        .then(() => {

            Array.from(Array(pageSize)).forEach((el, i) => {    //paging

                let pageIndex = this.state.blockheight - i - 1 - (this.props.match.params.page - 1) * pageSize;

                if (this.props.match.params.page <=                     //max page overflow and negative positions
                    Math.ceil(this.state.blockheight / pageSize) && pageIndex >= 0) {
                    this.getBlock(pageIndex, i);
                }
            });
        }).catch(console.log);
    }

    getBlock(height, arrayIndex) {

        return api.request('getblock', height, 1).then((response) => {

            if (response) {

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
        });
    }

    render() {
        return (
            <div className="view-page">
                <h1>All blocks</h1>

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
                <br/>
                <br/>
                <Link className={((parseInt(this.props.match.params.page) > 1) ? '' : 'invisible')}
                      to={`/blocks/${parseInt(this.props.match.params.page) - 1}`}>Previous</Link>
                <span> </span>
                <Link to={`/blocks/${parseInt(this.props.match.params.page) + 1}`}>Next</Link>

            </div>
        );
    }
}

export default Blocks;