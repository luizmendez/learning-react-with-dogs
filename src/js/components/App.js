import React, { Component } from 'react';
import Header from './commons/header';
import Footer from './commons/footer';
import Router from './router/router';
import Route from './router/route';
import Redirect from './router/redirect';
import Otherwise from './router/otherwise';
import AllDogs from './showdogs/all-dogs';
import Dog from './showdogs/dog';
import About from './about/';
import SubmitDog from './submitdog/submitdog';

import url from '../../styles/app.css';

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
            <div className="main-wrapper">
                <Router>
                    <Header
                        showFilter={showFilter}
                        updateFilterValue={this.updateFilterValue}
                        filterValue={filterValue}
                    />
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/dogs">
                        <AllDogs filterValue={this.state.filterValue} />
                    </Route>
                    <Route path="/dog/:breed">
                        <Dog />
                    </Route>
                    <Route path="/submitdog">
                        <SubmitDog />
                    </Route>
                    <Redirect path="/" redirect="/dogs" />
                    <Otherwise path="/dogs" />
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default App;
