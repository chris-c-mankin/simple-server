import { IncomingMessage } from "http";
import extractURLParams from "../urlParams";

export type Request = ReturnType<typeof createRequest>;

export default function createRequest(req: IncomingMessage) {

    const [url, query] = extractURLParams(req.url);

    return {
        url,
        query,method: req.method
    }
}