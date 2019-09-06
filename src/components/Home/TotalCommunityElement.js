import React from "react"
import {Link} from "react-router-dom";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

class TotalCommunityElement extends React.Component {

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
                        <span>{this.props.item.community}</span>
                    </Col>
                </Row>
            </div>

        )
    }

}

export default TotalCommunityElement