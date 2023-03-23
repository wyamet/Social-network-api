# Social Network API

## Description

This is a social network API where users can share their thoughts, react to friends’ thoughts, and create a friend list. The application uses Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API_Routes](#api_routes)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To install necessary dependencies, run the following command:

```
npm install
```

## Usage

To start the application, run the following command:

```
npm start
```

## API_Routes

The following API routes are available:

### `/api/users`

- `GET`: Returns all users.
- `GET /:id`: Returns a single user by their ID and populates their thought and friend data.
- `POST`: Creates a new user.
- `PUT /:id`: Updates a user by their ID.
- `DELETE /:id`: Deletes a user by their ID.

### `/api/users/:userId/friends/:friendId`

- `POST`: Adds a new friend to a user's friend list.
- `DELETE`: Removes a friend from a user's friend list.

### `/api/thoughts`

- `GET`: Returns all thoughts.
- `GET /:id`: Returns a single thought by its ID.
- `POST`: Creates a new thought and pushes the created thought's ID to the associated user's thoughts array field.
- `PUT /:id`: Updates a thought by its ID.
- `DELETE /:id`: Deletes a thought by its ID.

### `/api/thoughts/:thoughtId/reactions`

- `POST`: Creates a reaction stored in a single thought's reactions array field.
- `DELETE`: Removes a reaction by the reaction's reactionId value.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contributing

Contributions are welcome. If you would like to contribute, please fork the repository and make changes as you'd like. Pull requests are welcome.

## Questions

If you have any questions about the repo, open an issue or contact me directly at ser.wd7@gmail.com . You can find more of my work at [https://github.com/wyamet].
