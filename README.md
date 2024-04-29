# Podcaster
The application is a simple podcast player that allows you to listen to music podcasts. It is built using React and TypeScript, and uses Vite as the build tool. The application is responsive and can be used on both desktop and mobile devices.
Here you will find the source code of the application and the instructions necessary to run it in both development and production modes.

### Table of Contents
- [Development mode](#development-mode)
- [Production mode](#production-mode)
- [Testing](#testing)
- [Features](#features)
  - [Browser Router](#browser-router)
  - [Sync Storage](#sync-storage)
  - [Audio Player](#audio-player)
  - [Parsing html links](#parsing-html-links)

## Development mode

To run the application in development mode, follow these steps:

1. Clone the repository to your local machine using the following command:
    ```
    git clone https://github.com/Erich-izertis/podcaster
    ```

2. Open a terminal and navigate to the root directory of the project.

3. Run the following command to install all the necessary dependencies:
    ```
    npm install
    ```

4. Run the following command to start the application in development mode:
    ```
    npm run dev
    ```

The application will start in development mode and you can access it through your browser at the address [http://localhost:5173](http://localhost:5173).

## Production Mode

To run the application in production mode, follow the same steps above, but instead of running `npm run dev`, run the following commands:

1. Run the following command to build the optimized production version of the app:
    ```
    npm run build
    ```

2. Then run the following command to start the application in production mode:
    ```
    npm run preview
    ```

The application will start in production mode and will also be available at [http://localhost:4173](http://localhost:4173).

## Testing

To run the tests, follow these steps:

Run the following command to start the test environment:
    ```
    npm run test
    ```

All components and views have been tested.

## Features

### Browser Router
- [x] Implement a browser router using React Router.
- [X] Implement lazy loading for the home, podcast, and episode views.

### Sync Storage
- [x] Implement a sync storage using the browser's local storage.
- [X] Stores the list of podcasts and episodes once a day.

### Audio Player
- [x] Implement an audio player using the HTML5 audio element.

### Parsing html links
- [x] Implement a function to parse html links from the podcast description.

