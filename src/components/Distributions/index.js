import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';
import DistributionListElement from "../Home/DistributionListElement";

class Distributions extends Component {

    constructor() {
        super();

        this.state = {
        };
    }

    render() {

        var totalLastDistributionsData = [{personId: 1, day: '01/04/2019'}, {personId: 1, day: '01/04/2019'}, {personId: 1, day: '01/04/2019'}, {personId: 1, day: '01/04/2019'}];
        this.state.totalLastDistributionsDataList = totalLastDistributionsData.map(item => <DistributionListElement key={item.personId} item={item}/>)

        return(
            <div className="view-page">
                <div className="table-list">
                    <h1>All distributions</h1>
                    {this.state.totalLastDistributionsDataList}
                    <br/>
                    <br/>
                    <Link to={`/distributions/${ parseInt(this.props.match.params.page) + 1}`}>Next Page</Link>
                </div>
            </div>
        );
    }

}

export default Distributions;