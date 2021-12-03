import http from 'http';
import { IncomingMessage } from "http";
import handler from './router/handler';
import createRequest, { Request } from './router/request';
import createResponse, {Response} from './router/response';

const PORT = process.env.PORT || 5000;

export type Route = {[key: string]: (req: Request, res: Response) => void}
export type Routes = {
    get: Route;
    post: Route;
}

type RouterMethod = (url: string, fn: (req: Request, res: Response) => void) => void;
type Router = {
    [key in 'get' | 'post']: RouterMethod;
}

export default function createRouter() {

    const routes: Routes = {
        get: {},
        post: {}
    };

    const server = http.createServer(async (req,res) => {

        const response = createResponse(res);
        const request = await createRequest(req);
    
        handler(request,response,routes);
    })

    server.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })

    const router: Router = {
        get(url, fn) {
            routes.get[url] = fn;
        },
        post(url, fn) {
            routes.post[url] = fn;
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
 
router.post('/api/data', (req, res) => {

    console.log(req)

    console.log(req.body)
})