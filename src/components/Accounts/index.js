import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';
import AccountListElement from "../Home/AccountListElement";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";

class Accounts extends Component {

    constructor() {
        super();

        this.state = {
        };
    }

    render() {

        var totalAccountsData = [{accountHash: 1, codename: 'myAccount1'}, {accountHash: 2, codename: 'myAccount2'}, {accountHash: 3, codename: 'myAccount3'},
            {accountHash: 4, codename: 'myAccount4'}, {accountHash: 5, codename: 'myAccount5'}, {accountHash: 6, codename: 'myAccount6'}, {accountHash: 7, codename: 'myAccount7'},
            {accountHash: 8, codename: 'myAccount8'}, {accountHash: 9, codename: 'myAccount9'}, {accountHash: 10, codename: 'myAccount10'}, {accountHash: 11, codename: 'myAccount11'},
            {accountHash: 12, codename: 'myAccount12'}, {accountHash: 13, codename: 'myAccount13'}, {accountHash: 14, codename: 'myAccount14'}, {accountHash: 15, codename: 'myAccount15'},
            {accountHash: 16, codename: 'myAccount16'}, {accountHash: 17, codename: 'myAccount17'}, {accountHash: 18, codename: 'myAccount18'}, {accountHash: 19, codename: 'myAccount19'},
            {accountHash: 20, codename: 'myAccount20'}];
        this.state.totalAccountsDataList = totalAccountsData.map(item => <AccountListElement key={item.accountHash} item={item}/>)


        return(
            <div className="view-page">
                <div className="table-list">

                    <h1>All addresses</h1>

                    <div className="table-header btn btn-twitter">
                        <Row>
                            <Col sm> <span>Human accounts</span></Col>
                            <Col sm><span>Company and institute accounts</span></Col>
                        </Row>
                    </div>
                    {this.state.totalAccountsDataList}
                    <br/>
                    <br/>
                    <Link className={( (parseInt(this.props.match.params.page) > 1) ? '' : 'invisible')}
                          to={`/accounts/${ parseInt(this.props.match.params.page) - 1}`} onClick={this.forceUpdate}>Previous</Link>
                    <span> </span>
                    <Link to={`/accounts/${ parseInt(this.props.match.params.page) + 1}`} onClick={this.forceUpdate}>Next</Link>
                </div>
            </div>
        );
    }

}

export default Accounts;