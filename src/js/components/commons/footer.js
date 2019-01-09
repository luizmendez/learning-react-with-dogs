import React, { Component } from 'react';
import Link from '../router/link';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <Link href="https://github.com/luizmendez/learning-react-with-dogs">
                    Learning React with Dogs 2019
                </Link>{' '}
                -{' '}
                <Link href="www.luizmendez.com" target="_blank">
                    Luiz Méndez
                </Link>
            </div>
        );
    }
}

export default Footer;
