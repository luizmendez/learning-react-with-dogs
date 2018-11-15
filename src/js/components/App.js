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
    render() {
        return (
            <div className="main-wrapper" style={wrapperStyle}>
                <Header />
                <MainContent />
                <Footer />
            </div>
        );
    }
}

export default App;
