import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';
import TransactionListElement from "../Home/TransactionListElement";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

class Transactions extends Component {

    constructor() {
        super();

        this.state = {
        };
    }

    render() {

        var transactionActivityData = [{type: 'Invocation', transactionID: '50b9ccaef0f9306eba1b34fbd9a66aa1365dbf8b9b9085e206310eff458db370', timestamp: 1551338586},
            {type: 'Invocation', transactionID: '13e5c967c76158f4ea197094f4e7fd47ad2165f223f4131564aa6e4bcb34a069', timestamp: 1551338586},
            {type: 'Invocation', transactionID: 'd75d22aa4fe1788e201db2f191a0459285d072ca423e429a51e6d26e2f61c3d4', timestamp: 1551338586},
            {type: 'Invocation', transactionID: 'ada996ad33ad98fbe3524e2b46e7bff3d4e3952f37c20ec273350d9a5eae70bb', timestamp: 1551338586},
            {type: 'Invocation', transactionID: '4d84ba1b1f9003d121fd2480420e3d36b3451d0fbb9806fde6dd62f23294ba38', timestamp: 1551338586}];
        this.state.transactionActivityList = transactionActivityData.map(item => <TransactionListElement key={item.transactionID} item={item}/>)


        return(
            <div className="view-page">
                <div className="table-list">
                    <h1>All transactions</h1>

                    <div className="table-header btn btn-twitter ">
                        <Row>
                            <Col sm> <span>Transaction Type</span></Col>
                            <Col sm><span>Transaction ID</span></Col>
                            <Col sm><span>Timestamp</span></Col>
                        </Row>
                    </div>
                    {this.state.transactionActivityList}
                    <br/>
                    <br/>
                    <Link className={( (parseInt(this.props.match.params.page) > 1) ? '' : 'invisible')}
                          to={`/transactions/${ parseInt(this.props.match.params.page) - 1}`} onClick={this.forceUpdate}>Previous</Link>
                    <span> </span>
                    <Link to={`/transactions/${ parseInt(this.props.match.params.page) + 1}`} onClick={this.forceUpdate}>Next</Link>
                </div>
            </div>
        );
    }

}

export default Transactions;