# SimpleUserAuth.js

SimpleUserAuth.js is a lightweight user authentication library for Node.js. It provides a simple and secure way to manage user registration, login, and data encryption.

## Installation

You can install SimpleUserAuth.js using npm:

``npm install simpleuserauth``

Please run `generateKeys.js` to generate the keys for the RSA algorithm. **DO NOT GENERATE A NEW KEYSET WHILE THE FILE IS ENCRYPTED OR YOU WILL LOSE ALL OF YOUR DATA.**


## Usage

Here's an example of how to use SimpleUserAuth.js in your Node.js application:

```javascript
const Users = require('simpleuserauth');

// Create an instance of the Users class
const users = new Users();

// Initialize the library
users.init();

// Register a new user
users.newUser('username', 'password');

// Log in with the registered user
const loginResult = users.login('username', 'password');
if (loginResult.errorcode === 0) {
  console.log('Login successful');
  console.log('User:', loginResult.user);
} else {
  console.log('Login failed:', loginResult.message);
}
```

For more detailed documentation and examples, please refer to the [API documentation](https://github.com/DangerStep/SimpleUserAuth.js/wiki).

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/DangerStep/SimpleUserAuth.js).

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).
