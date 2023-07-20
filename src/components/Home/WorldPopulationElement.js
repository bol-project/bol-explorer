import React from "react"
import {Link} from "react-router-dom";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";

class WorldPopulationElement extends React.Component {

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
                        <span>{this.props.item.population}</span>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default WorldPopulationElement