require("dotenv").config();
import * as express from "express";
import * as bodyParser from "body-parser";
import BaseRouter from "./routes";
const { Pool, Client } = require("pg");

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.app.use("/api", BaseRouter);
    this.connectDB();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private async connectDB() {
    const client = new Client({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      ssl: true
    });
    await client.connect();
    client.query("SELECT * FROM Customer", (err, res) => {
      console.log(err, res);
    });
  }
}

export default new App().app;
