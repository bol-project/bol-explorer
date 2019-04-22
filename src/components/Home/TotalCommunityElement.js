import React from "react"
import {Link} from "react-router-dom";

class TotalCommunityElement extends React.Component {

    constructor(){
        super();

        this.state = {};
    }

    render() {

       return (
            <div className="list-element">
                Day: {this.props.item.day} Community: {this.props.item.community}
            </div>

        )
    }

}

export default TotalCommunityElement