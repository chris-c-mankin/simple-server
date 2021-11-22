export function reduceToObj<T extends readonly any[],U,R extends string | number>(arr: T, getKey: (el: T[number]) => R, getVal: (el: T[number]) => U): {[key in R]: U} {
    return arr.reduce((acc,el) => {
        acc[getKey(el)] = getVal(el);
        return acc;
    }, {} as {[key in R]: U})
}