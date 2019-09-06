import React from "react"
import {Link} from "react-router-dom";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

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
                        <span>{this.props.item.personId}</span>
                    </Col>
                    <Col sm>
                        <span>{this.props.item.day}</span>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default DistributionListElement