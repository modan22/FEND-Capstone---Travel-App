Certainly! Here's a rewritten version of the README:

---

# Travel App Project

## Getting Started

Follow the steps below to set up and run the Travel App:

### Development Mode

To start the Webpack development server on port 8080, use:

```bash
$ npm run dev
```

### Production Mode

To build the project for production and start the server on port 8081:

```bash
$ npm run build-prod
$ npm run start
```

The `build-prod` command generates a `dist` folder with all necessary files, while `start` launches the server.

## Configuration

The project uses two Webpack configuration files:
- `webpack.dev.js` for development
- `webpack.prod.js` for production

Refer to the `package.json` file for all scripts and dependencies.

**Note:** To interact with the APIs, create a `.env` file to store the necessary URLs and API keys.

## APIs Used

The project integrates with the following APIs:
- [Dark Sky](https://darksky.net/dev/docs) for weather data
- [OpenCage](https://opencagedata.com/api) for geographical coordinates
- [Pixabay](https://pixabay.com/api/docs/) for place images

## Offline Functionality

Service workers are configured in Webpack to enable offline functionality. When active, you should see a relevant message in the browser's inspection tools.

## Testing

Testing is managed with Jest. To execute the tests, run:

```bash
$ npm run test
```

## Application Pages

### Homepage

Users can enter trip details on the homepage.

![Homepage](https://github.com/harshitagupta30/travel-app/blob/master/src/client/media/Screen1.png)

### Trip Details Modal

Clicking the search button triggers a modal displaying the trip details.

![Modal](https://github.com/harshitagupta30/travel-app/blob/master/src/client/media/Screen2.png)

### Saved Trips

Saved trips are stored in the browser's local storage. Users are redirected to the saved trips page upon saving a trip.

![Saved Trips](https://github.com/harshitagupta30/travel-app/blob/master/src/client/media/Screen3.png)

On the saved trips page, users can add new trips or delete all saved trips. Choosing to add a new trip redirects back to the homepage.

---

