import React, { Component } from 'react';


import './style.css';
import JsonRpcClient from "react-jsonrpc-client";

var api = new JsonRpcClient({
    endpoint: process.env.REACT_APP_SERVER_URL
});
class Transaction extends Component {

    _isMounted = false;

    constructor() {
        super();
        this.state = {
        };
    }


    hex2a(hexx) {
        var hex = hexx.toString();//force conversion
        var str = 'jhgv';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }


    componentWillMount() {
        this._isMounted = true;

        this.getTransaction();
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

    getTransaction() {

        api.request('getrawtransaction', this.props.match.params.transactionHash, 1).then((response) => {

            if (response && this._isMounted) {

                let sentFrom = null;
                if(response.attributes && response.attributes.length) {
                    response.attributes.forEach((attr) => {
                        if(attr && attr.usage && attr.usage === 'Script') {
                            sentFrom = attr.data;
                        }
                    })
                }

                let remark = null;
                if(response.attributes && response.attributes.length) {
                    response.attributes.forEach((attr) => {
                        if(attr && attr.usage && attr.usage === 'Remark') {
                            remark = this.hex2a(attr.data);
                        }
                    })
                }

                let remark1 = null;
                if(response.attributes && response.attributes.length) {
                    response.attributes.forEach((attr) => {
                        if(attr && attr.usage && attr.usage === 'Remark1') {
                            remark1 = this.hex2a(attr.data);
                        }
                    })
                }
                
                let remark2 = null;
                if(response.attributes && response.attributes.length) {
                    response.attributes.forEach((attr) => {
                        if(attr && attr.usage && attr.usage === 'Remark2') {
                            remark2 = this.hex2a(attr.data);
                            
                        }
                    })
                }              

                this.setState({
                    blockhash: response.blockhash,
                    txid: response.txid,
                    type: response.type,
                    sentFrom: sentFrom,
                    // Send to
                    blocktime: response.blocktime,
                    net_fee: response.net_fee,
                    size: response.size,
                    invocationScript: (response.scripts && response.scripts.length) ?
                        response.scripts[0]["invocation"] : null,
                    verificationScript: (response.scripts && response.scripts.length) ?
                        response.scripts[0]["verification"] : null,
                    remark: remark,
                    remark1: remark1,
                    remark2: remark2,
                });

                this.getBlock();
            }
        }).catch(console.log);
    }

    getBlock() {

        api.request('getblock', this.state.blockhash, 1).then((response) => {

            if (response && this._isMounted) {
                this.setState({
                    blockIndex: response.index
                });
            }
        });
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
                <h2>Transaction Information</h2>
                <div>
                    <table>
                        <tbody>

                        <tr><td className="tdLabel">Transaction Id: </td><td>{this.state.txid}</td></tr>
                        <tr><td className="tdLabel">Transaction Type: </td><td>{this.state.type}</td></tr>
                        <tr><td className="tdLabel">Send from: </td><td>{this.state.sentFrom}</td></tr>
                            <tr><td className="tdLabel">Send to: </td><td>{this.state.sentTo}</td></tr>
                        <tr><td className="tdLabel">Included in block: </td><td>{this.state.blockIndex}</td></tr>
                        <tr><td className="tdLabel">Timestamp: </td><td>{(!this.state.blocktime) ? '' :
                            dtFormat.format(new Date(0).setUTCSeconds(this.state.blocktime))}</td></tr>
                        <tr><td className="tdLabel">Network Fee: </td><td>{this.state.net_fee}</td></tr>
                        <tr><td className="tdLabel">Size: </td><td>{this.state.size}</td></tr>
                        <tr><td className="tdLabel">Invocation script: </td>
                            <td style={{"whiteSpace": "inherit","wordBreak": "break-word"}}>{this.state.invocationScript}</td></tr>
                        <tr><td className="tdLabel">Verification script: </td>
                            <td style={{"whiteSpace": "inherit","wordBreak": "break-word"}}>{this.state.verificationScript}</td></tr>
                        <tr><td className="tdLabel">Remark: </td>
                            <td style={{"whiteSpace": "inherit","wordBreak": "break-word"}}>{this.state.remark}</td></tr>
                        <tr><td className="tdLabel">Remark1: </td>
                            <td style={{"whiteSpace": "inherit","wordBreak": "break-word"}}>{this.state.remark1}</td></tr>
                        <tr><td className="tdLabel">Remark2: </td>
                            <td style={{"whiteSpace": "inherit","wordBreak": "break-word"}}>{this.state.remark2}</td></tr>


                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default Transaction;