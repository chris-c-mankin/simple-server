import { reduceToObj } from "../../util";

export default function query(str?: string) {

    if (!str) return {};

    const formedParams = formParams(str);

    const params = buildParamsObject([
        ...extractNonArrParams(formedParams), 
        ...constructArrParams(formedParams)
    ]);

    return params;
    
}

export const formParams = (str: string): [string, string][] => 
    str.split('&')
    .map(str => str.split('='))
    .filter(arr => arr[1] !== "")
    .map(arr => [arr[0], arr[1]]);

// const buildParamsObject = (params: [string, unknown][]) => 
//     params.reduce((acc, param) => ({
//         ...acc,
//         [param[0]]: param[1]
//     }), {});

export const buildParamsObject = (params: [string, unknown][]) => 
    reduceToObj(params, el => el[0], el => el[1])

export const isArrParam = (param: [string,string]) => 
    param[0].slice(-2) === '[]';

export const extractArrParams = (params: [string,string][]) => 
    trimArrParamBrackets(params.filter(p => isArrParam(p)));

export const extractNonArrParams = (params: [string,string][]) =>
    params.filter(p => !isArrParam(p));

export const trimArrParamBrackets = (params: [string,string][]): [string,string][] =>
    params.map(p => [p[0].slice(0,p[0].length - 2), p[1]]);

export const constructArrParams = (params: [string,string][]) =>
    getUniqueParams(extractArrParams(params)).map(
        p => [p, getArrParamValues(p, extractArrParams(params))]
    ) as [string, string[]][];

const getUniqueParams = (params: [string,string][]) =>
    [...new Set(params.map(p => p[0]))]

export const getArrParamValues = (param: string, params: [string,string][]) =>
    params.filter(p => p[0] === param).map(p => p[1])

