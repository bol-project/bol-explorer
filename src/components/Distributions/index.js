import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';
import DistributionListElement from "../Home/DistributionListElement";
import BlockListElement from "../Home/BlockListElement";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

class Distributions extends Component {

    constructor() {
        super();

        this.state = {
        };
    }

    componentWillMount() {          //the first true life cycle method: called one time, which is before the initial render
        fetch('https://5d8313cdc9e3410014070ff8.mockapi.io/v1/distributePerPerson' + this.props.match.params.page)
            .then(res => res.json())
            .then((data) => {                   //remove 0 index of OK result and parse data to component
                this.setState({ totalLastDistributionsDataList: data.slice(1).map(item => <DistributionListElement key={item.id} item={item}/>)})
            })
            .catch(console.log)
    }

    render() {

        // var totalLastDistributionsData = [{personId: 1, day: '01/04/2019'}, {personId: 1, day: '01/04/2019'}, {personId: 1, day: '01/04/2019'}, {personId: 1, day: '01/04/2019'}];
        // this.state.totalLastDistributionsDataList = totalLastDistributionsData.map(item => <DistributionListElement key={item.personId} item={item}/>)

        return(
            <div className="view-page">
                <div className="table-list">
                    <h1>All d</h1>

                    <div className="table-header btn btn-twitter">
                        <Row>
                            <Col sm> <span>Person</span></Col>
                            <Col sm><span>Day</span></Col>
                        </Row>
                    </div>
                    {this.state.totalLastDistributionsDataList}
                    <br/>
                    <br/>
                    <Link className={( (parseInt(this.props.match.params.page) > 1) ? '' : 'invisible')}
                          to={`/D/${ parseInt(this.props.match.params.page) - 1}`} onClick={this.forceUpdate}>Previous</Link>
                    <span> </span>
                    <Link to={`/D/${ parseInt(this.props.match.params.page) + 1}`}  onClick={this.forceUpdate}>Next</Link>
                </div>
            </div>
        );
    }

}

export default Distributions;