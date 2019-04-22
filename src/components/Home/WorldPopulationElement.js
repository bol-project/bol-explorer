import React from "react"
import {Link} from "react-router-dom";

class WorldPopulationElement extends React.Component {

    constructor(){
        super();

        this.state = {};
    }

    render() {

       return (
            <div className="list-element">
                Day: {this.props.item.day} Population: {this.props.item.population}
            </div>

        )
    }

}

export default WorldPopulationElement