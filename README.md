#  Flicker App

##  Installation
    # Running locally
    $ npm install
    $ npm start # Navigate to http://localhost:4600

    # Build for production
    $ npm build

    # Run production build
    $ cd dist/
    $ http-server

## Tools

- Parcel bundler for ES6 Modules & Hot Module Replacemnt
- Babel for ES6 Async/Await syntax
- ESLint & Preetier for code style ([Airbnb configuration](https://github.com/airbnb/javascript))
- Node.js and NPM

###### No 3rd party packages used in the code



## Architecture
This app is divided to 3 main entities:
components, store, and a manager.

### Components
The components are just functions which generate an HTML template with data,
and might hold a subscription to the manager.

Each High-Level (Gallery and Header) component is responsible to
a. call the render util function, which insert the template to a given parent.
b. subscribe to update and decide if we need to rerender

We have 5 components:
1. Main (initiate the main view and call for the data)
2. Header
3. Gallery
4. Gallery Item
5. AppError

### Store
The store is a simple Flux based state-managment,
which in our case solve the issue of syncing the data with the UI functions,

and provide us seperation of concerns.
The store hold a state object and subscription that called each state-change.

### Manager
The manager (PhotoManager in this app) is holding most of the logic:

he recives data from the API, process it and setting it to the state.
