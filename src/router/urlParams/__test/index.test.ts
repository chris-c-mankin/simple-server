import assert from 'assert';
import query, { 
    formParams,
    buildParamsObject,
    trimArrParamBrackets,
    extractArrParams,
    extractNonArrParams,
    getArrParamValues,
    constructArrParams,
    isArrParam
} from '../query';

describe('URL & Query Param formulation', () => {

    describe('formParams', () => {

        it('correctly splits query params and values', () => {
            assert.deepEqual(formParams('color=blue'),[['color','blue']])
            assert.deepEqual(formParams('color=blue&number=two'),[['color','blue'],['number','two']])
        })

        it('ignores invalid additonal values', () => {
            assert.deepEqual(formParams('color=blue&number=two=three'),[['color','blue'],['number','two']])
        })

        it('removes params with undefined values', () => {
            assert.deepEqual(formParams('color=blue&number='),[['color','blue']])
        })
    })


    describe('buildParamsObject', () => {

        it('builds correct object from params array', () => {
            assert.deepEqual(buildParamsObject([['color','blue'],['number','two']]),{color: 'blue',number: 'two'})
        })
    })

    describe('isArrParam', () => {

        it('correctly determines between array parmeters and non-array parameters', () => {
            assert.equal(isArrParam(['color[]', 'red']),true)
            assert.equal(isArrParam(['color[]s', 'red']),false)
            assert.equal(isArrParam(['color', 'red']),false)
        })
    })

    describe('trimArrParamBrackets', () => {

        it('trims sqaure brackets off array parameters', () => {
            assert.deepEqual(trimArrParamBrackets([['color[]','blue'],['number[]','two']]),[['color','blue'],['number','two']])
        })
    })


    describe('extractArrParams', () => {

        it('filters array parameters from parameter array and trims the square brackets', () => {
            assert.deepEqual(extractArrParams([['color[]','blue'],['number[]','two']]),[['color','blue'],['number','two']])
            assert.deepEqual(extractArrParams([['color[]','blue'],['number','two']]),[['color','blue']])
        })
    })


    describe('extractNonArrParams', () => {

        it ('filters parameters that are not array parameters', () => {
            assert.deepEqual(extractNonArrParams([['color[]','blue'],['number','two']]),[['number','two']])
        })
    })

    describe('getArrParamValues', () => {
        
        it('finds all values of given array parameter', () => {
            assert.deepEqual(getArrParamValues('color',[['color','blue'],['number[]','two']]), ['blue'])
            assert.deepEqual(getArrParamValues('color',[['color','blue'],['color','red'],['number[]','two']]), ['blue','red'])

        })
    })

    describe('constructArrParams', () => {

        it('extracts array parameters and reduces them to a single parameter with array of values', () => {
            assert.deepEqual(constructArrParams([['color[]','blue'],['color[]','red'],['number','two']]), [['color',['blue','red']]])
        })
    })
})

describe('unit test: query', () => {

    it('constructs query object from query string', () => {
        assert.deepEqual(query('color[]=blue&color[]=red&number=two'), {
            color: ['blue','red'],
            number: 'two'
        })
    })
})