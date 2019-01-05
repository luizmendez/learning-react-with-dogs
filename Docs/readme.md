# Learning React with Dogs

### What is this?

As the name implies, this is a personal project, meant for learning while coding.
The main focus was to learn React, Redux, Test Driven Development with Jest and as a final step NodeJs.

**At this part of the project, NodeJs is still not implemented but will be as next step.**

### What is the app's purpose?

The app fetches data from [DogAPI](https://dog.ceo/dog-api/) and shows it in a simple way as an images list.
The list can be filtered, contains a lazy load component for the dogs images and you can submit a dog picture through a form.
It implements a handmade router and manages state with Redux and Context.
For a more detailed description of the app to the Project section.

## Installation

1. **Prerequisites:** The project needs [Node](https://nodejs.org) ^10.13.0 and [Yarn](https://yarnpkg.com) ^1.12.3 to as a dependency manager.
2. Download or clone the project to a local folder
3. While in the project folder run `yarn install`
4. When all dependencies are installed, run `yarn start` to start the dev server

### The Project

### Features

-   Show a list of dogs retrieved from [DogAPI](https://dog.ceo/dog-api/)
-   Filter the list by dog breeds through a text input
-   Show an image of each breed retrieved from [DogAPI](https://dog.ceo/dog-api/)
-   Each dog breed name appears on a tooltip when you hover over the image
-   Each dog has its own page with details retrieved from [MediaWiki](https://www.mediawiki.org/wiki/API:Main_page)
-   Submit a dog picture through a form
-   Each dog card is only rendered when the component is in the viewport, by using a lazy load component
-   Each dog image has a preload of the image and displays a placeholder if there were loading errors

### Architecture

-   The project uses React for UI rendering
-   Redux is used as a state manager for sharing state between non immediate parent/child components
-   A `<Router />` component was created from scratch based on the [react-router](https://github.com/ReactTraining/react-router) implementation
-   The router components use **react context** as a state manager instead of redux as the router needed the easiest way to pass data between components

#### State Management

As the app kept getting more features passing data between components became more complicated, as a way to simplify the state passed between components, Redux was implemented. This can be seen in the `<SubmitDog />` and `<AllDogs />` components which share the same data.

As Redux's actions don't wait asynchronous functions, the [redux-thunk](https://github.com/reduxjs/redux-thunk) middleware was used for resolving this behavior.

In this app, Redux handles the fetching and sending of data from the APIs as well as managing this information in the store. It also stores and removes messages from the message list that `<MessageHandler />` uses.

### Key parts

#### `<App />`

The root component of the App.
Connects with the Redux store and actions to be passed as props.
On mount, the component fetches the dog's list from local storage if present or from the API to be set on store.

#### Router

The `<Router />` component was coded from scratch based on the [react-router](https://github.com/ReactTraining/react-router) library. It has four main components: `<Router />`, `<Route />`, `<Redirect />` and `<Otherwise/ >`. There's also a `<Link />` component to assist with navigation.
Uses **React Context** to handle the state and pass it to components that may need it.

[Read more about the router](Docs/components.md#router)

#### ShowDogs Components

The main content of the app. Several components that fetch a list of dog breeds and manages image display of them.
Shows as a card list, with the image of each dog showing at first, but when hovering on each image, a tooltip created with **React Portals** follows the cursor with the breed name until it leaves the image.

A lazy loader was implemented to load the image only when the component is inside the viewport, meanwhile or if there are any errors, a placeholder will be shown.
The dog list can be filtered by breed using a controlled component text input.

Each dog has its own page to display some information fetched from the Wikipedia Media API, as this part was just an excuse to populate a page with different text, some information that the API returns may not be really related to the dog breed.
A route component was created to only show an image if the breed of the dog page is a Pug, this was used to test the route component as not a direct child of the router component.

[Read more about the showdogs components](Docs/components.md#showdogs)

#### `<SubmitDog />`

**At the moment this component is still under work and only showcases error handling**

Allows the user to submit a dog image with the name and breed of the dog. The `<select>` element lists all the dogs' breeds received from the API and passed down by `<App />`.
An image preview is shown next to the form after the user selects an image from their computer.
Form submission calls an action that sends the form data to the corresponding endpoint, which currently don't exists and will be developed in the second part of this app. For now, it just showcases error handling.

[Read more about SubmitDog](Docs/components.md#submitDog)

#### Error Handling

To display alerts, warning, errors and any necessary type of message, the app uses `<MessageHandler />` and `<Snackbar />` components.

The `<MessageHandler>` receives a list of messages which renders as `<Snackbars />` until they are either manually or automatically closed. If there are several message at the same time they start to stack up from bottom to top. When the `<Snackbar />` component is closed a callback function can be called to perform any other action, for example, removing the message from state.

The `<Snackbar />` component shows either a string message or any given children. The component alone is able to autoclose after some time, defaults to 3000ms but can also be passed as a prop for diferent times. There are other options like not autoclosing, hiding the close button, and the type of message to be shown (alert, warning, error).

[Read more about the Error Handling components](Docs/components.md#error-handling)

### Disclaimer

Some of the app features may be incomplete or can be enhanced. The focus of this project was not to have a polished off application, but to learn, comprehend and implement modern tools and processes.

## Testing

Testing was implemented on late stage of the UI development, in parallel to Redux. All of Redux's actions and reducers were implemented using **Test Driven Development**. The `<SubmitDog />` component was tested after learning how to unit test on Redux. After this, the `<MessageHandler />` and `<Snackbar />` components were created using TDD.

As testing was implemented late in the project, not all components have tests.

To test the app in the project folder run `yarn test`.

#### Tools

-   **[Jest](https://jestjs.io/)** was used as the main testing platform for the app.
-   **[Enzyme](https://airbnb.io/enzyme/docs/guides/jest.html)** library created by AirBnB to test components
-   **Mock libraries** used:
    -   [mock-local-storage](https://www.npmjs.com/package/jest-localstorage-mock) mock for testing localstorage
    -   [mock-fetch](https://www.npmjs.com/package/fetch-mock) mock for testing dog list and dog image fetching
    -   [mock-store](https://github.com/dmitry-zaets/redux-mock-store) redux store mock for async actions and middleware

## Components

[See a detailed list of the components used in the project.](Docs/components.md)

## Styles

-   Styles were added using a vanilla stylesheet that loads inside `<App />`.
-   [Bootstrap 4](https://getbootstrap.com/) is loaded from official CDN on index.html

## Conclusion

The project is teaching me how to use modern tools and processes such as **React**, **Redux**, **Test Driven Development** using **Jest** as a testing platform and in the next step of the project I will learn **NodeJS**.

The project was started without a boilerplate, I learned how to start up a project from scratch using **Yarn**, **Webpack** and **Babel**. This project was focused on React but this knowledge can be used for any kind of project.

Git is used, which I have already known and use before but this is the first time I use **git-flow** in a project.

After configuring the project, I learned how to plan the architecture of an app, defining specs and features and how they should interact with the application and between them.

As the coding started, there was so much to learn in react, starting with JSX, components and their lifecycle, props, state, the render method, render props, high order components, refs, portals, context... to name some. My mind set also changed as I have to start thinking in React. Immutability, components just serving one purpose, when and when not to create a state, how components should communicate between each others.

When the app state management necessities grew, Redux was implemented with Test Driven Development process using Jest as the testing platform. This was new for me, I learned a lot from this as to how to set up a testing environment, which helpers I would need to use and how to use them, and what to test in the code. Then some components were created using TDD with the help of the **Enzyme** library.

Redux actions were used to fetch information from an API, so I learned to use **Thunk** as a middleware in this cases. I learned actions and reducers and how they connect to the app passing the store and actions as props to the components that needed them.

Last but important, I learned how to create proper **documentation** inside the code and outside of it, such as this readme file.

I will continue updating myself in modern technologies and processes, the next step is learning **NodeJS**, **Express** and **Sequelize** to finish the second part of this project and then apply all this knowledge in a real project.

## Pull Requests and Issues

As this project was made for learning purposes, no pull request are taken, but issue reporting is greatly appreciated, and can be submitted through the [project's issue page](https://github.com/luizmendez/learning-react-with-dogs/issues).

## Resources

-   [React](https://reactjs.org)
-   [Redux](https://redux-form.com/)
-   [React-Redux](https://react-redux.js.org/)
-   [Thunk](https://github.com/reduxjs/redux-thunk)
-   [Jest](https://jestjs.io/)
-   [Enzyme](https://airbnb.io/enzyme/docs/guides/jest.html)
-   [DogAPI](https://dog.ceo/dog-api/)
-   [Wikipedia Mediawiki API](https://www.mediawiki.org/wiki/API:Main_page)
-   [Bootstrap](https://getbootstrap.com/)
-   [NodeJS](https://nodejs.org/)
-   [Webpack](https://webpack.js.org/)
-   [Yarn](https://yarnpkg.com/en/)

Special thanks to **[edrpls](https://github.com/edrpls)** for his mentoring during this project.
