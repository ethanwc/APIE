// /lib/routes/crmRoutes.ts
import {Request, Response} from "express";

//TODO: DB Connection
//
export class Routes {       
    public routes(app): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request!'
            })
        })               
    }
}