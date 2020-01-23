// lib/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import BaseRouter from './routes'

class App {

    public app: express.Application;


    constructor() {
        this.app = express();
        this.config();    
        this.app.use("/api", BaseRouter);
    }

    private config(): void{ 
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

    }

    // private async connectDB(): Promise<void> {
    //     const client = new Client()
    //     await client.connect()
    //     const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    //     console.log(res.rows[0].message)
    //     await client.end()
    // }

}

export default new App().app;