import React from 'react';
import Link from '../router/link';

function About() {
    return (
        <div className="about-content">
            <h2>About</h2>
            <div>
                <h3>What is this?</h3>
                <p>
                    Personal project as a way to learning while coding. The main focus of learning
                    was React, Redux, Test Driven Development with Jest and as a final step NodeJs.
                </p>
                <h3>What the app does?</h3>
                <p>
                    The app manages data from DogAPI and shows it in a simple way in the app. For
                    more detailed description of the app specs go to the App and Components
                    description section.
                </p>
            </div>
            <h3>Links</h3>
            <p />
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
                    <Link href="https://reactjs.org/" target="_blank">
                        React
                    </Link>
                </li>
                <li>
                    <Link href="https://redux.js.org/" target="_blank">
                        Redux
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default About;
