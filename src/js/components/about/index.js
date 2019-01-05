import React from 'react';
import Link from '../router/link';

function About() {
    return (
        <div className="about-content">
            <h2>About</h2>
            <div>
                <h3>What is this?</h3>
                <p>
                    Personal project as a way to learn while coding. The main focus was learning
                    React, Redux, Test Driven Development with Jest and as a final step NodeJs.
                </p>
                <h3>What does the app do?</h3>
                <p>
                    The app fetches data from DogAPI and shows it in a simple way as an images list.
                    The list can be filtered, contains a lazy load component for the dogs images and
                    you can submit a dog picture through a form. It implements a handmade router and
                    manages state with Redux and Context.
                </p>
                <p>
                    For a more detailed description of the app read the{' '}
                    <Link
                        href="https://github.com/luizmendez/learning-react-with-dogs/Docs/"
                        target="_blank">
                        documentation
                    </Link>{' '}
                    in the project&#39;s{' '}
                    <Link href="https://github.com/luizmendez/learning-react-with-dogs">
                        github page
                    </Link>
                    .
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
                <li>
                    <Link href="https://https://jestjs.io/" target="_blank">
                        Jest
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default About;
