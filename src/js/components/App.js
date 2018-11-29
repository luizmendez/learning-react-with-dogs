import React, { Component } from 'react';
import Header from './commons/header';
import Footer from './commons/footer';
import Router from './router/router';
import Route from './router/route';
import Redirect from './router/redirect';
import Otherwise from './router/otherwise';
import AllDogs from './showdogs/all-dogs';
import Dog from './showdogs/dog';

const wrapperStyle = {
    width: '95%',
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column'
};

class App extends Component {
    state = {
        showFilter: true,
        filterValue: ''
    };

    updateFilterValue = filterValue => {
        this.setState({ filterValue });
    };

    showFilter = showFilter => {
        this.setState({ showFilter });
    };

    render() {
        const { showFilter, filterValue } = this.state;
        return (
            <div className="main-wrapper" style={wrapperStyle}>
                <Header
                    showFilter={showFilter}
                    updateFilterValue={this.updateFilterValue}
                    filterValue={filterValue}
                />
                <Router>
                    <Route path="/dogs">
                        <AllDogs filterValue={this.state.filterValue} />
                    </Route>
                    <Route path="/dog/:breed">
                        <Dog />
                    </Route>
                    <Redirect path="/" redirect="/dogs" />
                    <Otherwise path="/dogs" />
                </Router>
                <Footer />
            </div>
        );
    }
}

export default App;
