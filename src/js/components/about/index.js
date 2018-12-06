import React from 'react';
import Link from '../router/link';

function About() {
    return (
        <div className="about-content">
            <h2>About</h2>
            <div>Project for learning purposes.</div>
            <ul>
                <li>
                    <Link
                        href="https://github.com/luizmendez/learning-react-with-dogs"
                        target="_blank">
                        Github
                    </Link>
                </li>
                <li>
                    <Link href="//dog.ceo/dog-api/">Dog API</Link>
                </li>
                <li>
                    <Link href="luizmendez.com" target="_blank">
                        Luiz Mendez (Bad formed link)
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default About;
