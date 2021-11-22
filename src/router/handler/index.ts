import { IncomingMessage } from "http";
import { Route, Routes } from "../..";
import logger from "../logger";
import { Request } from "../request";
import { Response } from "../response";

export default function handler(req: Request, res: Response, routes: Routes) {

    logger(req)

    function handleRoute(route: Route) {
    
        const paths = Object.keys(route);

        for (const path of paths) {

            if (req.url === path) {

                route[path](req,res);

                return;
            }
        }
    }

    switch(req.method) {
        case 'GET': handleRoute(routes.get)
    }
}