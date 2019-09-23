import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';
import AddressListElement from "../Home/AddressListElement";

class Addresses extends Component {

    constructor() {
        super();

        this.state = {
        };
    }

    render() {

        var addressActivityData = [{addressId: 'AV8uSHreU4FZMD3CLSBBYj92w4q5Kg7q3Z', created: 1551338586, transactions: 12, lastTransaction: '1212212052676845b59d15993059e098c0c10c7742bfb93292cb469a70ebb04d', tokens: 4},
            {addressId: 'AW7XKWzvV9uefQgScDukZzrQ8rQp7EXEXZ', created: 1551338586, transactions: 22, lastTransaction: 'e58a23a7daf57ed6012ce0b057c52d90578cd23ad3c36cc9e2f2f48ebd816fef', tokens: 3},
            {addressId: 'AUCWftQexW7LteV6azdm9TdQiRMjTPf7xQ', created: 1551338586, transactions: 1, lastTransaction: 'fecce28aea42a52b91d89efddf9ea596db3a9f2d3a3b352a6291bd6f27701c91', tokens: 4},
            {addressId: 'AJeAEsmeD6t279Dx4n2HWdUvUmmXQ4iJvP', created: 1551338586, transactions: 22, lastTransaction: 'c24eec4a1991f7c603202d9024027226d1344a295e4da4b14870b13bf536911b', tokens: 1},
            {addressId: 'ARh1qMmZ8TcaE36nb3eQa7STadZ7eFQNPA', created: 1551338586, transactions: 12, lastTransaction: 'bbd52838c26bdda4cdeec7586ad78e59a99da66f4ba41e971a5fb09c65f488f1', tokens: 3}];
        this.state.addressActivityList = addressActivityData.map(item => <AddressListElement key={item.addressId} item={item}/>)


        return(
            <div className="view-page">
                <div className="table-list">
                    <h1>All addresses</h1>
                    {this.state.addressActivityList}
                    <br/>
                    <br/>
                    <Link to={`/addresses/${ parseInt(this.props.match.params.page) + 1}`}>Next Page</Link>
                </div>
            </div>
        );
    }

}

export default Addresses;