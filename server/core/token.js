import jwt from 'jsonwebtoken';

const seed = process.env.JWT_SEED || 'my-json-web-token-seed!';
const expiration = process.env.JWT_EXP || '30d';


export default class Token {

  constructor() { }

  static getJwToken(payload) {
    return jwt.sign({
      user: payload
    }, seed, { expiresIn: expiration });
  }

  static compareToken(userToken) {
    return new Promise((resolve, reject) => {
      jwt.verify(userToken, seed, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}