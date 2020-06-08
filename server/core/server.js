import express from 'express';


import { PORT } from '../config';

export default class Server {

  constructor() {
    this.app = express();
    this.port = PORT;
  }

  start(callback) {
    this.app.listen(this.port, callback);
  }
}