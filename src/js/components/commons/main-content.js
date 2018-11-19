import React, { Component } from "react";
import AllDogs from "../showdogs/all-dogs";

class MainContent extends Component {

    render() {
        return (
            <AllDogs filterValue={this.props.filterValue}/>
        );
    }
}

export default MainContent;
