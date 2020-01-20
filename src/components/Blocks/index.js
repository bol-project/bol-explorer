import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';
import BlockListElement from "../Home/BlockListElement";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

class Blocks extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    componentWillMount() {          //the first true life cycle method: called one time, which is before the initial render
        //fetch('https://5d712628d3448a001411b54a.mockapi.io/blocks' + this.props.match.params.page)
        fetch('http://localhost:5000/api/blocks?Page=' + this.props.match.params.page + '&PageSize=20')
            .then(res => res.json())
            .then((data) => {                   //remove 0 index of OK result and parse data to component
               // this.setState({ blockActivityList: data.slice(1).map(item => <BlockListElement key={item.hash} item={item}/>)})
                this.setState({ blockActivityList: data.items.map(item => <BlockListElement key={item.hash} item={item}/>)})
            })
            .catch(console.log)
    }

    render() {
        return(
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
                {this.state.blockActivityList}
                <br/>
                <br/>
                <Link className={( (parseInt(this.props.match.params.page) > 1) ? '' : 'invisible')}
                      to={`/blocks/${ parseInt(this.props.match.params.page) - 1}`} onClick={this.forceUpdate}>Previous</Link>
                <span> </span>
                <Link to={`/blocks/${ parseInt(this.props.match.params.page) + 1}`} onClick={this.forceUpdate} >Next</Link>

            </div>
        );
    }

}


export default Blocks;