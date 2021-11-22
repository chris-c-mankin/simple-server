import { ServerResponse } from "http";

type SendArgs = [number, unknown] | [unknown];

export type Response = ReturnType<typeof createResponse>;

export default function createResponse(res: ServerResponse) {

    function send(...args: SendArgs) {

        let status: number, data: unknown;

        if (args.length === 2 && typeof args[0] === 'number') {
            status = args[0];
            data = args[1];
        } else {
            status = 200;
            data = args[0];
        }

        res.writeHead(status, { "Content-Type": 'application/json'});
        res.end(JSON.stringify(data));

    }

    return {
        send
    }

}