import { IncomingMessage } from "http";
import extractURLParams from "../urlParams";

export type Request = {
    url: string;
    query: {[key: string]: unknown};
    body: any;
    method?: string;
};

export default async function createRequest(req: IncomingMessage) {

    const [url, query] = extractURLParams(req.url);

    const body = await getParsedRequestBody(req);

    return {
        url,
        query,
        body,
        method: req.method
    }
}

async function getParsedRequestBody(req: IncomingMessage) {

    const body = await getRequestBody(req);

    return JSON.parse(body)
}

function getRequestBody(req: IncomingMessage): Promise<string> {

    return new Promise((resolve, reject) => {

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString()
        })
    
        req.on('end', () => {
            resolve(body)
        })

    })

}