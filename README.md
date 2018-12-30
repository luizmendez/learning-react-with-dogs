Learning React with Dogs
========================

### What is this?

As the name implies is a personal project as a way to learning while coding.
The main focus of learning was React, Redux, Test Driven Development with Jest and as a final step NodeJs.

### What the app does?

The app manages data from [DogAPI](https://dog.ceo/dog-api/) and shows it in a simple way in the app.  
For more detailed description of the app specs go to the App and Components description section.

Installation
------------

1. You will need [Node](https://nodejs.org) ^10.13.0 with [NPM](https://nodejs.org) ^6.4.1 (included with Node) or [Yarn](https://yarnpkg.com) ^1.12.3 to run the project.
2. Download or clone the project to a local folder
3. While in the folder run `yarn install` or `npm install` depending what you use
4. When all dependencies are installed, run `yarn start` or `npm start` to start the dev server


The Project
-----------


####Features
 
 - Show a list of dogs retrieved from [DogAPI](https://dog.ceo/dog-api/)
 - Filter the list by the breed of the dog through a user input
 - Show an image of each dog breed retrieved from [DogAPI](https://dog.ceo/dog-api/) *lazydog
 - Each dog breed name appears on a tootltip when you hover over the dog
 - Each dog has his own page with details about the dog retrieved from [MediaWiki](https://www.mediawiki.org/wiki/API:Main_page)
 - Submit a dog picture through a form

####Architecture

- The project uses react as the framework
- Redux is used as a state manager although the project was started without it
- A router was created from scratch based on the [react-router](https://github.com/ReactTraining/react-router) library
- The router components use **react context** as a state manager instad of redux for the sake of learning

####Details

 - A lazy load component was written to only show components when it is on screen
 - The project has a basic message handling component which can be used in other projects
 - The project uses [Bootstrap](https://getbootstrap.com/) as a css style base
 
### Disclaimer

As the main objective of the project was to learn to use certain tools in modern development in a real project, many of the app features may be incomplete or can be greatly enhaced. So the focus of this project more than having a polished off app is to comprehend and implement modern code with moderns tools. 



The Components
--------------

###App
- Main component of the app.
- Connects with redux store
- Is passed by props store state and redux actions
- On Mount retrieve by localStorage or by fetching the list of dogs from the api
- Render the main markdown of the app
- Renders Router components
- Renders MessageHandler component

###Header
- Renders the header markup
- Renders the nav menu of the app with router links
- Renders the dogFilter component when the route path is the given one

###DogFilter
- Form with an input and a reset button
- The reset button only shows when there's text in the input field
- The form is a directed controlled component so the input recives his value from the store props
- When the user changes the input value an action prop is called to update the value in the store

###Footer
- Render the footer, currently an empty `<div>` element

###AllDogs
- Home content of the app
- Shows a list of dog through image cards
- Filter the dog list in accordance to the filterValue store state

###LazyDog
- Checks if the component is in sight of the viewport
- If the card is in sight render the children, if not just render an empty div

###DogCard
- Shows the dog picture as a card
- Have a link to the dog page
- When the mouse is over the card it shows a tooltip created through a react portal that follows the mouse showing the dog's breed name 
- When the mouse leaves the card the tooltip is no longer visible

###DogPic
- Renders an image element with the picture of the dog
- Wait for the image to load on a virtual element
- If the image doesn't loads or have errors laoding display a placeholder 

###Dog
- Shows the dog information through a fetch to wikipedia media api
- If the dog breed is a Pug shows an image thorugh route rendering

###MousePosition
- Render prop component
- Pass to the component that renders the mouse position as props

###DogTip
- Shows or hides a tooltip that follows the mouse
- The tootltip is created by React Portals


###SubmitDog
- Renders a form to submit a dog image
- When selected the image to be submitted it shows as a preview
- When the form is submitted sends the data to an action function

###About
- Renders an about page with several links


###Snackbar
- Renders an snackbar component
- The component shows a message passed through props or the component's children
- There are several styles (colors) of snackbars depending on the type
- Auto closes at 3000ms, time can be changed or auto close can be removed 
- There's a hiddeable close button to close the component

###MessageHandler
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

###Route
- Register the route to the router
- Compares current path or location with the route path and renders its children if there's a match

###Redirect
- Register the redirect to the router
- Compares current path with redirect route path and if there's a match history push to the redirection

###Otherwise
- Register otherwise route to the router

###Link
- Renders a link `<a></a>` element
- Gets current location from react context
- Checks if the href attribute of the link is internal or complete URL
- If the href is internal calls for a history.pushState
- If the href is a complete URL (mostly external links) sets window.location or calls window.open() depending on the link's href attribute


Styles
------

How I am using them?
Why?

Testing

How to test the project
Method of testing
TDD

Conclusion

PR and Bugfixes

Thanks and resources used

Links
Credits
