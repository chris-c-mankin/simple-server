import query from "./query";

export default function extractURLParams(url?: string) {

    if (!url) return ['', {}] as [string, {[key: string]: unknown}];

    const [path,queryString] = split(url);

    const params = query(queryString);

    return [path, params] as [string, {[key: string]: unknown}];
}

function split(url: string): [string, string | undefined] {

    const arr = url.split('?');

    const path = arr[0] || '';
    const queryString = arr[1];

    return [path,queryString] as [string, string | undefined];

}