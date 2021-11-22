import { IncomingMessage } from "http";
import { Request } from "../request";

export default function logger(req: Request) {
    const message = `${req.method} ${req.url}`;
    const style = '\x1b[32m%s\x1b[0m';

    console.log(style,message);
    console.log(req.query);
}