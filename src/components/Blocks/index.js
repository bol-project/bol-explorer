import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';
import BlockListElement from "../Home/BlockListElement";

class Blocks extends Component {

    constructor() {
        super();

        this.state = {
        };
    }

    render() {

        var blockActivityData = [{index: 1, size: 1526, version: 1, hash: '1', time: 1551338586},
            {index: 1, size: 1526, version: 1, hash: '2', time: 1551338587}, {index: 1, size: 1526, version: 1, hash: '3', time: 1551338588},
            {index: 1, size: 2232, version: 1, hash: '4', time: 1551338583}, {index: 1, size: 3426, version: 1, hash: '5', time: 1551338588}];
        this.state.blockActivityList = blockActivityData.map(item => <BlockListElement key={item.hash} item={item}/>)


        return(
            <div>
                <h1>All blocks</h1>

                {this.state.blockActivityList}

                <br/>
                <br/>
                <Link to={`/blocks/${ parseInt(this.props.match.params.page) + 1}`}>Next Page</Link>

            </div>
        );
    }

}

export default Blocks;