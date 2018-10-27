#  Flicker App

##  Installation
    # Running locally
    $ npm install
    $ npm start # Navigate to http://localhost:4600

    # Build for production
    $ npm build

    # Deploy dist/ folder to flicksy.now.sh
    $ npm run deploy

## Tools

- Parcel bundler for ES6 Modules & Hot Module Replacemnt
- Babel for ES6 Async/Await syntax
- ESLint & Preetier for code style ([Airbnb configuration](https://github.com/airbnb/javascript))
- Node.js and NPM

###### No 3rd party packages used in the code


## Architecture
We can separate the app into 3 main entities:
components, store, and a manager.

### Components
The components are just functions which generate an HTML template with data,
and might hold a subscription to the manager store.

Each High-Level (Gallery and Header) component is responsible to:

a. call the render util function, which inserts the template to a given parent.

b. subscribe to update and decide if we need to rerender

We have 5 components:
1. Main
2. Header
3. Gallery
4. Gallery Item
5. AppError

### Store
The store is a simple class for state management.

It solves the issue of syncing the data with the UI, in a way that separates our concerns,
by holding state object and subscription that called after every change.

### Manager
The manager (PhotoManager in this app) extend the store, and holding most of the app logic:

Receiving data from the API, process it, and setting it to the state.
