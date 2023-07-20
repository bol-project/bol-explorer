import React from "react"
import {Link} from "react-router-dom";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";

class BlockListElement extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {

        var dtFormat = Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        return (

            <div className="list-element">
                <Row>
                    <Col sm>
                        <Link to={"/block/" + this.props.item.hash}>
                            <span>{this.props.item.index}</span>
                        </Link>
                    </Col>
                    <Col sm>
                        <span>{this.props.item.size}</span>
                    </Col>
                    <Col sm>
                        <span>{(this.props.item.tx && this.props.item.tx.length) ? this.props.item.tx.length : 0}</span>
                    </Col>
                    <Col sm>
                        <span>{this.props.item.nextconsensus}</span>
                    </Col>
                    <Col sm>
                        <span>{(!this.props.item.time) ? '' :
                            dtFormat.format(new Date(0).setUTCSeconds(this.props.item.time))}</span>
                    </Col>
                </Row>
            </div>

        )
    }

}

export default BlockListElement