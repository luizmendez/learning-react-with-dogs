import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import * as actions from '../actions/';

/* Router */
import Router from './router/router';
import Route from './router/route';
import Redirect from './router/redirect';
import Otherwise from './router/otherwise';

/* App Components */
import Header from './commons/header';
import Footer from './commons/footer';
import MessageHandler from './messagehandler/messagehandler';
import DogList from './showdogs/doglist';
import Dog from './showdogs/dog';
import About from './about/';
import SubmitDog from './submitdog/submitdog';

/* Values to pass as props from the redux store */
const mapStateToProps = state => {
    return {
        filterValue: state.filterValue, // Value of the filter applied to dogList
        dogList: state.dogList, // Array of dog objects
        dogListError: state.dogListError, // Error message when retrieving the dogList
        messagesList: state.messagesList // Array of message objects (alerts, errors, info)
    };
};

/* Actions to be pased as props from redux*/
const mapDispatchToProps = {
    setDogFilter: actions.setDogFilter, // Set the values of the filter to be applied to the dog list
    getDogs: actions.getDogs, // Retrieves the dogList
    fetchDogImg: actions.fetchDogImg, // Fetch the dog picture url from api
    sendDogForm: actions.sendDogForm, // Send the information of the submitDog form to an api
    setMessage: actions.setMessage, // Sets messages on list
    removeMessage: actions.removeMessage // Removes messages on list
};

class App extends Component {
    static propTypes = {
        filterValue: PropTypes.string,
        dogList: PropTypes.array,
        dogListError: PropTypes.string,
        messagesList: PropTypes.array,

        setDogFilter: PropTypes.func,
        getDogs: PropTypes.func,
        fetchDogImg: PropTypes.func,
        sendDogForm: PropTypes.func,
        setMessage: PropTypes.func,
        removeMessage: PropTypes.func
    };

    componentDidMount() {
        // Retrieve dogList from the action prop
        this.props.getDogs();
    }

    render() {
        const {
            dogList, // List of dogs as an array of objects
            setDogFilter, // Action to set the filter value
            filterValue, // Value of the filter to the dogList
            fetchDogImg, // Action to fetch the dog image url
            sendDogForm, // Action to send the submitDog form data
            messagesList, // Messages List as an array of objects
            removeMessage // Action to reomve a message to the list
        } = this.props;

        // Render the main markup of the app, through the Router components decide what to render depending on the current path
        // The MessageHandler component is rendered outside of any Router component
        return (
            <div className="main-wrapper">
                <Router>
                    <Header updateFilterValue={setDogFilter} filterValue={filterValue} />
                    <div className="main-content">
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/dogs">
                            <DogList
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
                    </div>
                    <Footer />
                </Router>
                <MessageHandler messagesList={messagesList} callback={removeMessage} />
            </div>
        );
    }
}

// Redux connect
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
