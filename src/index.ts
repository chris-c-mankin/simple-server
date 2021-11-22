import http from 'http';
import { IncomingMessage } from "http";
import handler from './router/handler';
import createRequest, { Request } from './router/request';
import createResponse, {Response} from './router/response';

const PORT = process.env.PORT || 5000;

export type Route = {[key: string]: (req: Request, res: Response) => void}
export type Routes = {
    get: Route;
}

export default function createRouter() {

    const routes: Routes = {
        get: {}
    };

    /* function handler(req: IncomingMessage, res: Response) {

        console.log(`${req.headers.host}${req.url}`)

        const handler = createHandler(req,res);
    
        switch(req.method) {
            case 'GET': handler(routes.get)
        }
    } */

    const server = http.createServer(async (req,res) => {

        const response = createResponse(res);
        const request = createRequest(req);
    
        handler(request,response,routes);
    })

    server.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })

    const router = {
        get(url: string, fn: (req: Request, res: Response) => void) {
            routes.get[url] = fn;
        }
    };

    return router;

}

const router = createRouter();

router.get('/api/test', (req,res) => {

    const arr = req.query.array;

    res.send(200, 'Hello res ext' + JSON.stringify(arr));
})


router.get('/api/data', (req,res) => {

    res.send({data: [1,2,3]})
})
 