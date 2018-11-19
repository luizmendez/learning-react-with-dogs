import React, { Component } from "react";
import DogFilter from "../filter/dogfilter"

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Kewl Doggos Picz</a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Doggos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                    <DogFilter updateFilterValue={this.props.updateFilterValue} filterValue={this.props.filterValue} />
                </div>
            </nav>
        );
    }
}

export default Header;
