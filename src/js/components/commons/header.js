import React from 'react';
import DogFilter from '../filter/dogfilter';
import Link from '../router/link';
import Route from '../router/route';

function Header(props) {
    // Renders the app header as Title, Menu and dogFilter when the route has the given path
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" href="/">
                Kewl Doggos Picz
            </Link>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" href="/dogs">
                            Doggos
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/submitdog">
                            Send a Doggo
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/about">
                            About
                        </Link>
                    </li>
                </ul>
                <Route path="/dogs">
                    <DogFilter
                        updateFilterValue={props.updateFilterValue}
                        filterValue={props.filterValue}
                    />
                </Route>
            </div>
        </nav>
    );
}

export default Header;
