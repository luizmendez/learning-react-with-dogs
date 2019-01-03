#Learning React with Dogs
=========================

### What is this?

As the name implies is a personal project as a way to learning while coding.
The main focus of learning was React, Redux, Test Driven Development with Jest and as a final step NodeJs.

### What the app does?

The app manages data from [DogAPI](https://dog.ceo/dog-api/) and shows it in a simple way in the app.  
For more detailed description of the app specs go to the App and Components description section.

Installation
------------

1. **Prerequisites:** The project needs [Node](https://nodejs.org) ^10.13.0 with [NPM](https://nodejs.org) ^6.4.1 (included with Node) or [Yarn](https://yarnpkg.com) ^1.12.3 to run the project.
2. Download or clone the project to a local folder
3. While in the proyect folder run `yarn install` or `npm install` depending what you use
4. When all dependencies are installed, run `yarn start` or `npm start` to start the dev server


###The Project
-----------


###Features
 
 - Show a list of dogs retrieved from [DogAPI](https://dog.ceo/dog-api/)
 - Filter the list by the breed of the dog through a user input
 - Show an image of each dog breed retrieved from [DogAPI](https://dog.ceo/dog-api/) *lazydog
 - Each dog breed name appears on a tootltip when you hover over the dog
 - Each dog has his own page with details about the dog retrieved from [MediaWiki](https://www.mediawiki.org/wiki/API:Main_page)
 - Submit a dog picture through a form
 - Each dog card is only rendered when the component is in the viewport sight (lazy load)
 - Each image has a preload of the image and report if there was errors on the loading

###Architecture

- The project uses react as a framework
- Redux is used as a state manager although the project was started without it
- A router was created from scratch based on the [react-router](https://github.com/ReactTraining/react-router) library
- The router components use **react context** as a state manager instead of redux for learning purposes

###Key parts
------------

####App
The main component of the App, is the parent of all teh components in the app.
App component connects with the Redux store and actions to be passed as props.
On mount the component fetches the dog list from local storage or from the api depending the case to be setted on store.
This component renders the **Router** component with the main routes, redirects and otherwise. The component also renders the **MessageHandler** component which shows all the messages through the app.


####Router
As mentioned before a **Router** component was coded from scratch based on the [react-router](https://github.com/ReactTraining/react-router) library for managing routing. The router is composed by 4 components: **Router**, **Route**, **Redirect** and **Otherwise**. There's also a link component to use as `<a>` element that implements link routing.
The router is the ony part of the app that uses **React Context** to handle the state passed to the link component.

[Read more about the router](###Router)


####ShowDogs
The main content of the app. Several components that fetch a list of breed of dogs and images of each breed.
The list shows as a card list, with ony the image of each dog showing at first instance but when hovering the mouse on each image a tooltip created with **React Portals** follows the mouse with the dog's breed name until it lefts the image.

A lazy loader was implemented to only render the dogs on list when the image is on the viewport sight and it starts fetching the dog's image which starts preloading with a placeholder image that changes if the image loads without errors.
The dog list can be filtered by the dog's breed using a **controlled component** with an input text.

Each dog has his own page that shows a little information fetched from Wikipedia Media Api, as this part was just an excuse to populate a page with different text, some information that the API returns may be different of what is expected with the dog breed. A route component was created to only show an image if the breed of the dog page is a Pug, this was used to test the route component as not a direct child of the router component.

[Read more about the dog components](###Showdogs)


####SubmitDog
This component allows the user to submit a dog image with the name and breed of the dog. The `<select>` element listing all the dogs breeds is populated with the dog list fetched from app component.
When an image is seleted from the file field a preview of it is showed besides the form.
When submitting the form an action is called that should send the form data to the corresponding endpoint, which currently don't exists and it's gonna be the second part of this app.

[Read more about SubmitDog](###SubmitDog)


####MessageHandler and Snackbar
The app have the need of a message handler component to show all the alerts, warning, errors and any necessary type of message. The MessageHandler component recieves a list of messages which renders as Snackbars and shows them into the app until the snackbar is closed. If there's several message at the same time they start to stack up from bottom to top. When the snackbar component is closed a callback removes the message from the list.

The Snackbar component shows the message as a passed string prop or as the component children. The component alone is able to autoclose after some time, defaults to 3000ms but can also be passed as a prop for diferent times. There's also other options as not autoclosing (passing 0ms as a time closes immediately), showing or not the close button and the type of message to be shown (alert, warning, error).

[Read more about MessageHandler and Snackbar components](###MessageHandler)

####Redux
As the app kept getting more features a way to manage the state between not parent/children components was an increasing necessity as in the submitDog component needed the list of dog breeds. Redux was implemented with the help of the [react-redux](https://react-redux.js.org/) bindings.
Actions and reducers were created for functionality as fetching and setting the dog list and images, submitting a dog from the form, and adding or removing messages from the message list in store.

As actions don't dispatch asynchronous functions, [redux-thunk](https://github.com/reduxjs/redux-thunk), a middleware for resolving this was used in this cases.

 
### Disclaimer

As the main objective of the project was to learn to use certain tools in modern development in a real project, many of the app features may be incomplete or can be greatly enhaced. So the focus of this project more than having a polished off app is to comprehend and implement modern code with moderns tools. 


##Testing
-------
Testing was implemented on late state of the app when redux was also beign implemented. All of redux actions and reducers were implemented using **Test Driven Development**, writing the tests first and then the code or functions that this were testing.
When redux was implemented, the already created SubmitDog component was also tested as an example on how to test components. MessageHandler and Snackbar components were created using TDD after this.

As testing was implemented late in teh project and only as a mean to learn, most components remain untested and the code and component for which testing was written may need more testing cases.

To test the app in the project folder run `yarn test` or `npm test`.

####Tools
- **[Jest](https://jestjs.io/)** was used as the main testing platform for the app.
- **[Enzyme](https://airbnb.io/enzyme/docs/guides/jest.html)** library created by AirBnB to test components
- Several mocks were used when testing:
	-[mock-local-storage](https://www.npmjs.com/package/jest-localstorage-mock) -mock for testing localstorage  
	-[mock-fetch](https://www.npmjs.com/package/fetch-mock) - mock for testing dog list and dog image fetching
	-[mock-store](https://github.com/dmitry-zaets/redux-mock-store) - redux store mock for async actions and middleware


##Components
--------------

###App
- Main component of the app.
- Connects with redux store
- Is passed by props store state and redux actions
- On Mount retrieve by localStorage or by fetching the list of dogs from the api
- Render the main markdown of the app
- Renders Router components
- Renders MessageHandler component

###Showdogs

####AllDogs
- Home content of the app
- Shows a list of dog through image cards
- Filter the dog list in accordance to the filterValue store state

####DogFilter
- Form with an input and a reset button
- The reset button only shows when there's text in the input field
- The form is a directed controlled component so the input recives his value from the store props
- When the user changes the input value an action prop is called to update the value in the store

####LazyDog
- Checks if the component is in sight of the viewport
- If the card is in sight render the children, if not just render an empty div

####DogCard
- Shows the dog picture as a card
- Have a link to the dog page
- When the mouse is over the card it shows a tooltip created through a react portal that follows the mouse showing the dog's breed name 
- When the mouse leaves the card the tooltip is no longer visible

####DogPic
- Renders an image element with the picture of the dog
- Wait for the image to load on a virtual element
- If the image doesn't loads or have errors laoding display a placeholder 

####Dog
- Shows the dog information through a fetch to wikipedia media api
- If the dog breed is a Pug shows an image thorugh route rendering

####DogTip
- Shows or hides a tooltip that follows the mouse
- The tootltip is created by React Portals


###SubmitDog
- Renders a form to submit a dog image
- When selected the image to be submitted it shows as a preview
- When the form is submitted sends the data to an action function


###Commons

####Header
- Renders the header markup
- Renders the nav menu of the app with router links
- Renders the dogFilter component when the route path is the given one

####Footer
- Render the footer, currently an empty `<div>` element

####About
- Renders an about page with several links

####MousePosition
- Render prop component
- Pass to the component that renders the mouse position as props

###MessageHandler

####Snackbar
- Renders an snackbar component
- The component shows a message passed through props or the component's children
- There are several styles (colors) of snackbars depending on the type
- Auto closes at 3000ms, time can be changed or auto close can be removed 
- There's a hiddeable close button to close the component

####MessageHandler
- Renders a div in which messages appear
- Receives an array of messages and renders each as a snackbar
- Add a callback that removes the message from the list when the snackbar is closed


###Router
- Delegates what to show depending on the current location path
- Gets the current location path and divides it into path parts 
- Have 3 types of routing:
	- Router: compares current path with route path and render its children if there's a match
	- Redirect: compares current path with redirect path and if it's a match redirect current location to new redirect route path
	- Otherwise: if no route or redirect path is found go to the otherwise route path
- Routes, Redirects and Otherwise gets registered in a list of routes
- Allows params in the uri to render pages (dog/:dogbreed - dog/shiba)
- Creates a listener on history.pushState to be able to manage routing without having to reload the page
- This component and the ones related to the router use **React Context** as a state manager for the location, path and parts 

####Route
- Register the route to the router
- Compares current path or location with the route path and renders its children if there's a match

####Redirect
- Register the redirect to the router
- Compares current path with redirect route path and if there's a match history push to the redirection

####Otherwise
- Register otherwise route to the router

####Link
- Renders a link `<a></a>` element
- Gets current location from react context
- Checks if the href attribute of the link is internal or complete URL
- If the href is internal calls for a history.pushState
- If the href is a complete URL (mostly external links) sets window.location or calls window.open() depending on the link's href attribute


##Styles

- Styles were added using a vanilla stylesheet that loads on app component.
- Also [Bootstrap 4](https://getbootstrap.com/) was used in this project which loads from the offical CDN on index.html file


##Conclusion
As the project was made only for learning purposes, it made me code with modern tools on a project and not only a tutorial or sandbox. React with Redux and using Jest for testing is combo that I'm gonna be interesed in using on a real project.

##Pull Requests and Issues
As mentioned before, the project was made as means for learning so no pull request are admitted, any issue can be submitted through the [github issue page for the project](https://github.com/luizmendez/learning-react-with-dogs/issues).

##Resources
- [React](https://reactjs.org)
- [Redux](https://redux-form.com/)
- [React-Redux](https://react-redux.js.org/)
- [Thunk](https://github.com/reduxjs/redux-thunk)
- [Jest](https://jestjs.io/)
- [Enzyme](https://airbnb.io/enzyme/docs/guides/jest.html)
- [DogAPI](https://dog.ceo/dog-api/)
- [Wikipedia Mediawiki API](https://www.mediawiki.org/wiki/API:Main_page)
- [Bootstrap](https://getbootstrap.com/)
- [NodeJS](https://nodejs.org/)
- [Webpack](https://webpack.js.org/)
- [Yarn](https://yarnpkg.com/en/)


Special thanks to **[edrpls](https://github.com/edrpls)** for his mentoring during this project.
