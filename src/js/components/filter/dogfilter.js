import React, { Component } from 'react';

class DogFilter extends Component {
    state = {
        showReset: false
    };

    resetFilter = () => {
        this.setState({ filterValue: '' });
        this.props.updateFilterValue('');
        this.setState({
            showReset: false
        });
    };

    handleChange = e => {
        const val = e.target.value;
        this.props.updateFilterValue(val);
        this.setState({
            showReset: !!val
        });
    };

    handleSubmit = e => {
        e.preventDefault();
    };

    render() {
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
