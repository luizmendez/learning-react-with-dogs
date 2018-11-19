import React, { Component } from "react";
import Header from "./commons/header";
import MainContent from "./commons/main-content";
import Footer from "./commons/footer";

const wrapperStyle = {
    width: '95%',
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column'
};

class App extends Component {

    state = {
        filterValue: ""
    }

    updateFilterValue = (filterValue) => {
        this.setState({filterValue});
    }

    render() {
        return (
            <div className="main-wrapper" style={wrapperStyle}>
                <Header updateFilterValue={this.updateFilterValue} filterValue={this.state.filterValue}/>
                <MainContent filterValue={this.state.filterValue} />
                <Footer />
            </div>
        );
    }
}

export default App;
