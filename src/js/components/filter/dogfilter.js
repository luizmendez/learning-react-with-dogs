import React, { Component } from 'react';

class DogFilter extends Component {
    state = {
        showReset: false // Bool to show the reset button
    };

    // Resets the input field clearing the value in the store
    resetFilter = () => {
        this.setState(
            {
                showReset: false
            },
            () => this.props.updateFilterValue('')
        );
    };

    // Updates the filter value in store and removes the reset button if there's a truthy filter value
    handleChange = e => {
        const val = e.target.value;
        // Only show reset button when there's a value
        this.setState(
            {
                showReset: !!val
            },
            // Update filterValue through action props
            () => this.props.updateFilterValue(val)
        );
    };

    render() {
        // Renders the filter form
        return (
            <form className="form-inline my-2 my-lg-0">
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
