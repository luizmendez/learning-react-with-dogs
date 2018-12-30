import React, { Component } from 'react';

class DogFilter extends Component {
    state = {
        showReset: false // Bool to show the reset button
    };

    // Resets the input field clearing the value in the store
    resetFilter = () => {
        this.setState({ filterValue: '' });
        this.props.updateFilterValue('');
        this.setState({
            showReset: false
        });
    };

    // Updates the filter value in store and removes the reset button if there's a truthy filter value
    handleChange = e => {
        const val = e.target.value;
        // Update filterValue through action props
        this.props.updateFilterValue(val);
        // Only show reset button when there's a value
        this.setState({
            showReset: !!val
        });
    };

    // Don't submit the form
    handleSubmit = e => {
        e.preventDefault();
    };

    render() {
        // Renders the filter form
        return (
            <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                <input
                    className="dog-filter-search form-control mr-sm-2"
                    value={this.props.filterValue}
                    onChange={this.handleChange}
                    type="search"
                    placeholder="Search Dog"
                    aria-label="Search Dog"
                />
                {!this.state.showReset || (
                    <button className="btn btn-info my-2 my-sm-0" onClick={this.resetFilter}>
                        Reset
                    </button>
                )}
            </form>
        );
    }
}

export default DogFilter;
