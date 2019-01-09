## Components

### App

#### `<App />`

-   Main component of the app
-   Connects with redux store
-   Get Redux state and actions as props
-   Retrieves the dog list either from localStorage or an API request
-   Renders all the app content
-   Renders Router components
-   Renders MessageHandler component

### Router

#### `<Router />`

-   High Order Component that renders the appropriate component depending on the current location
-   Delegates what to show depending on the current location path
-   Gets the current location path and divides it into path parts
-   Has three types of routing components:
    -   `<Route />`: compares the current path with its path prop and renders its children if they match
    -   `<Redirect />`: compares the current path with the redirect prop and changes the location if they match
    -   `<Otherwise />`: redirects to the given path if the current location doesn't match any registered path
-   The values of Routes, Redirects and Otherwise are registered in the router internals
-   Reads params in the URI to render sub paths (dog/:dogbreed - dog/shiba)
-   Creates a listener on history.pushState to be able to manage routing without having to reload the page
-   Uses **React Context** to manage and share state, avoiding the use of 3rd party libraries as a way to learn state management just using React

#### `<Route />`

-   Register a path on the router
-   Compares the current path with the route path and if there's a match render the route children

#### `<Redirect />`

-   Register a redirect path on the router
-   Compares current path with redirect route path and if there's a match history push to the redirection

#### `<Otherwise />`

-   Register a fallback path on the router

#### `<Link />`

-   Renders a link `<a></a>` element enhanced with the processed routes
-   Gets current location from react context
-   Checks if the href attribute of the link is internal or complete URL
-   If the href is internal calls for a history.pushState
-   If the href is external sets `window.location` or calls `window.open()` depending on the link's target attribute

### Showdogs

#### `<DogList />`

-   Main section of the app
-   Displays a list of dogs as cards with an image
-   Filter the dog list in accordance to the store's filterValue

#### `<DogFilter />`

-   Form with an input and a reset button
-   The reset button only shows when there's text in the input field
-   The form is a controlled component, the input receives its value from store
-   When the user changes the input value an action prop is called to update the value in the store

#### `<LazyDog />`

-   High order component
-   Checks if the component is inside the viewport
-   If the card is in sight render the children
-   Otherwise render an empty div with the dimensions of the children, this to prevent jumps while scrolling when the children are rendering

#### `<DogCard />`

-   Shows the dog picture inside a fixed dimensions box
-   Links to the dog page
-   When the cursor is over the card it shows a tooltip created through a portal. It follows the cursor showing the breed name
-   When the cursor leaves the card the tooltip is no longer visible

#### `<DogPic />`

-   Renders an image element with the picture of the dog
-   Wait for the image to load
-   Display a placeholder while the image loads or if there were any errors

#### `<Dog />`

-   Shows the dog information through a fetch to Wikimedia API
-   If the dog breed is a Pug shows an image through route rendering

#### `<DogTip />`

-   Shows or hides a tooltip that follows the cursor
-   The tootltip is created with React Portals

### SubmitDog

#### `<SubmitDog />`

-   Renders a form to submit a dog image
-   Previews the selected image
-   Calls Redux action on form submission

### Commons

#### `<Header />`

-   Renders the header markup
-   Renders the navigation menu
-   Renders `<DogFilter />` component

#### `<Footer />`

-   Renders the footer

#### `<About />`

-   Renders information about the project

#### `<MousePosition />`

-   Receives a render prop to render its children

### Error Handling

#### `<MessageHandler />`

-   Renders a div in which messages appear
-   Receives an array of messages as `<Snackbar />` components
-   Can take a callback to perform any action after the `<Snackbar />` closes

#### `<Snackbar />`

-   Renders a `<div>` that contains a message
-   The component shows a message passed through props or the component's children
-   There are several styles (colors) of snackbars depending on the type
-   Auto closes at 3000ms, time can be changed or auto close can be removed
-   There's a hiddeable close button to close the component
