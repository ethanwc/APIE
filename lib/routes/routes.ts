// /lib/routes/crmRoutes.ts
import {Request, Response} from "express";

export class Routes {       
    public routes(app): void {          
        app.route('/auth/register')
        .post((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'Registered!'
            })
        })      
        
        app.route('/auth/login')
        .post((req: Request, res: Response) => {
            res.status(200).send({
                message: 'Logged In!'
            })
        })


        app.route('/device')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'Devices!'
            })
        })


        app.route('/data')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'Data!'
            })
        })


        app.route('/data')
        .post((req: Request, res: Response) => {
            res.status(200).send({
                message: 'Data Updated!'
            })
        })
    }
}