console.log('*******************************************************************');
console.log('................... Lancement de l\'application ...................');
console.log('*******************************************************************');
var shortid = require('shortid');

// U s e r A p i
// -------------
class UserApi {
  constructor() {
  }

  _login = async (email, password) => {
    console.log('UserApi/_login');
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id: shortid.generate(),
          email: email,
          password: password
        });
      }, 500);
    });
  }

  login = async (email, password) => {
    console.log('UserApi/login');
    var user = await this._login(email, password);
    console.log('UserApi/: user=', user);
    return user;
  }

  _logout = async (email, password) => {
    console.log('UserApi/_logout');
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id: shortid.generate(),
          email: email,
          password: password
        });
      }, 500);
    });
    
  }

  logout = async (email, password) => {
    console.log('UserApi/logout');
    var user = await this._logout(email, password);
    console.log('UserApi/: user=', user);
    return user;
  }
}

export const USER_API = new UserApi();