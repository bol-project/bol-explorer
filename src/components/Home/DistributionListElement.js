import React from "react"
import {Link} from "react-router-dom";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";

class DistributionListElement extends React.Component {

    constructor(){
        super();

        this.state = {};
    }

    render() {

        return (
            <div className="list-element">
                <Row>
                    <Col sm>
                        <span>{this.props.item.day}</span>
                    </Col>
                    <Col sm>
                        <span>{this.props.item.amount}</span>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default DistributionListElement