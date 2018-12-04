import React from 'react';
import DogFilter from '../filter/dogfilter';
import Link from '../router/link';

function Header(props) {
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
                        <Link className="nav-link" href="/about">
                            About
                        </Link>
                    </li>
                </ul>
                {props.showFilter && (
                    <DogFilter
                        updateFilterValue={props.updateFilterValue}
                        filterValue={props.filterValue}
                    />
                )}
            </div>
        </nav>
    );
}

export default Header;
