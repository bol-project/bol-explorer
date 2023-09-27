import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';
import TransactionListElement from "../Home/TransactionListElement";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";

class Transactions extends Component {

    constructor() {
        super();

        this.state = {
        };
    }

    componentWillMount() {          //the first true life cycle method: called one time, which is before the initial render
        fetch('http://localhost:5000/api/transactions?Page=' + this.props.match.params.page + '&PageSize=20')
            .then(res => res.json())
            .then((data) => {
                this.setState({ transactionActivityList: data.items.map(item => <TransactionListElement key={item.id} item={item}/>)})
            })
            .catch(console.log)
    }

    render() {

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