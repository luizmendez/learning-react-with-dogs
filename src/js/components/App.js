import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions/';

import Router from './router/router';
import Route from './router/route';
import Redirect from './router/redirect';
import Otherwise from './router/otherwise';

import Header from './commons/header';
import Footer from './commons/footer';
import MessageHandler from './messagehandler/messagehandler';
import AllDogs from './showdogs/all-dogs';
import Dog from './showdogs/dog';
import About from './about/';
import SubmitDog from './submitdog/submitdog';

const mapStateToProps = state => {
    return {
        filterValue: state.filterValue,
        dogList: state.dogList,
        dogListError: state.dogListError,
        submitDogError: state.submitDogError,
        messagesList: state.messagesList
    };
};

const mapDispatchToProps = {
    setDogFilter: actions.setDogFilter,
    getDogs: actions.getDogs,
    fetchDogImg: actions.fetchDogImg,
    sendDogForm: actions.sendDogForm,
    setMessage: actions.setMessage,
    removeMessage: actions.removeMessage
};

class App extends Component {
    componentDidMount() {
        this.props.getDogs();
    }

    render() {
        const {
            dogList,
            setDogFilter,
            filterValue,
            fetchDogImg,
            sendDogForm,
            setMessage,
            removeMessage,
            messagesList
        } = this.props;
        return (
            <div className="main-wrapper">
                <Router>
                    <Header updateFilterValue={setDogFilter} filterValue={filterValue} />
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/dogs">
                        <AllDogs
                            filterValue={filterValue}
                            dogList={dogList}
                            fetchDogImg={fetchDogImg}
                        />
                    </Route>
                    <Route path="/dog/:breed">
                        <Dog />
                    </Route>
                    <Route path="/submitdog">
                        <SubmitDog dogList={dogList} sendDogForm={sendDogForm} />
                    </Route>
                    <Redirect path="/" redirect="/dogs" />
                    <Otherwise path="/dogs" />
                    <Footer />
                </Router>
                <MessageHandler
                    messagesList={messagesList}
                    setMessage={setMessage}
                    removeMessage={removeMessage}
                />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
