const fs = require('fs');
const crypto = require('crypto');
const prompt = require('prompt-sync')({ sigint: true });

class User {
  constructor(username, password, data) {
    this.username = username;
    this.password = password;
    this.data = data;
  }
}

class Users {
  constructor() {
    this.registeredUsers = [];
    this.encryptData = true;
    this.fileName = 'user-data.json';
    this.loadUserData();
  }

  init() {
    console.log('This code is using the User Login Library! Support us at www.example.com');
    return { errorcode: 0, message: 'Initialization Success!' };
  }

  newUser(username, password, data = {}) {
    const existingUser = this.registeredUsers.find(user => user.username === username);
    if (existingUser) {
      return { errorcode: 1, message: 'Username already taken. Please choose a different username.' };
    }

    const user = new User(username, password, data);
    this.registeredUsers.push(user);
    this.saveUserData();

    return { errorcode: 0, message: 'User created successfully.' };
  }

  deleteUser(username, password = null, useTerminal = true) {
    const user = this.registeredUsers.find(user => user.username === username);

    if (!user) {
      return { errorcode: 1, message: 'User not found.' };
    }

    let enteredPassword;
    if (useTerminal) {
      enteredPassword = prompt('Enter your password to delete user account ' + username + ': ');
    } else {
      if (password === null) {
        return { errorcode: 1, message: 'Password must not be null. Please define password when not using the terminal.' }
      }
      enteredPassword = password;
    }

    if (user.password !== enteredPassword) {
      return { errorcode: 1, message: 'Incorrect password. Account deletion failed.' };
    }

    const userIndex = this.registeredUsers.findIndex(user => user.username === username);
    if (userIndex === -1) {
      return { errorcode: 1, message: 'User not found.' };
    }

    this.registeredUsers.splice(userIndex, 1);
    this.saveUserData();

    return { errorcode: 0, message: 'User deleted successfully.' };
  }

  login(username, password) {
    const user = this.registeredUsers.find(user => user.username === username);

    if (!user) {
      return { errorcode: 1, message: 'User not found. Please register an account.' };
    }

    if (user.password === password) {
      return { errorcode: 0, message: 'Login successful.', user: { username: user.username, password: user.password, data: user.data } };
    } else {
      return { errorcode: 1, message: 'Incorrect password. Please try again.' };
    }
  }

  loginWithTerminal() {
    const username = prompt('Enter your username: ');
    const password = prompt('Enter your password: ');

    return this.login(username, password);
  }

  saveUserData() {
    const data = this.encryptData ? this.encrypt(JSON.stringify(this.registeredUsers)) : JSON.stringify(this.registeredUsers);
    fs.writeFileSync(this.fileName, data, 'utf8');
  }

  loadUserData() {
    if (fs.existsSync(this.fileName)) {
      const data = fs.readFileSync(this.fileName, 'utf8');
      if (data) {
        try {
          let decryptedData = data;
          if (this.encryptData && (!data.startsWith('[') || !data.startsWith('{'))) {
            decryptedData = this.decrypt(data);
          }
          const jsonData = JSON.parse(decryptedData);
          this.registeredUsers = jsonData;
        } catch (error) {
          throw new Error(`Error loading user data: ${error}`);
        }
      }
    }
  }
  
  encrypt(text) {
    const publicKey = fs.readFileSync('publicKey.pem', 'utf8');
    const buffer = Buffer.from(text, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
  }

  decrypt(text) {
    const privateKey = fs.readFileSync('privateKey.pem', 'utf8');
    const buffer = Buffer.from(text, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString('utf8');
  }
}

module.exports = Users;
