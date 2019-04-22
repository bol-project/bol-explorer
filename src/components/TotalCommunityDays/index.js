import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';
import TotalCommunityElement from "../Home/TotalCommunityElement";

class TotalCommunityDays extends Component {

    constructor() {
        super();

        this.state = {
        };
    }

    render() {

        var totalCommunityData = [{dayId: 1, day: '01/01/2019', community: 10}, {dayId: 2, day: '01/02/2019', community: 12},
            {dayId: 3, day: '01/03/2019', community: 88}, {dayId: 4, day: '01/04/2019', community: 7055}, {dayId: 5, day: '01/05/2019', community: 551},
            {dayId: 6, day: '01/06/2019', community: 888}, {dayId: 7, day: '01/07/2019', community: 1001}, {dayId: 8, day: '01/08/2019', community: 1200},
            {dayId: 9, day: '01/09/2019', community: 1500}, {dayId: 10, day: '01/10/2019', community: 1909}, {dayId: 11, day: '01/11/2019', community: 5001},
            {dayId: 12, day: '01/12/2019', community: 1996}, {dayId: 13, day: '01/13/2019', community: 90668}, {dayId: 14, day: '01/14/2019', community: 10996},
            {dayId: 15, day: '01/15/2019', community: 70258}, {dayId: 16, day: '01/16/2019', community: 99366}, {dayId: 17, day: '01/17/2019', community: 1000580},
            {dayId: 18, day: '01/18/2019', community: 999999}, {dayId: 19, day: '01/19/2019', community: 1000025}, {dayId: 20, day: '01/20/2019', community: 9000000}];
        this.state.totalCommunityDataList = totalCommunityData.map(item => <TotalCommunityElement key={item.dayId} item={item}/>)


        return(
            <div className="table-list">

                <h1>Total Community People</h1>

                {this.state.totalCommunityDataList}

                <br/>
                <br/>
                <Link to={`/totalCommunityDays/${ parseInt(this.props.match.params.page) + 1}`}>Next Page</Link>
            </div>
        );
    }

}

export default TotalCommunityDays;