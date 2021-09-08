/**
 * @info - public methods
 */

import parse from "./parse";
import produce from "./generate";
import minimize from "./reduce";
import { typeOf } from "./utils/extra";
import { ARRAY, OBJECT, STRING } from "./utils/constant";

/**
 * validate data to be a JSON object
 * @param data - data to be validated
 * @param error - error to throw
 * @throws Error
 */
function validateJSON(data: any, error: string) {
    if (typeOf(data) === OBJECT || typeOf(data) === ARRAY) return;
    else throw new Error(error);
}

/**
 * use to validate a restmap
 * @param restmap - restmap string to validate
 * @return boolean
 */
export function verifyMap(restmap: string): boolean {
    try {
        // parse restmap & if successful return true
        parse(restmap);
        return true;

        // in case of error return false
    } catch (e) {
        return false;
    }
}

/**
 * use to generate a restmap from given json object
 * @param data - json object/array to be converted
 * @return string - restmap
 * @throws Error - if invalid JSON object
 */
export function generateMap(data: any): string {
    // validate that data is a proper JSON object
    validateJSON(data, "invalid JSON object");
    return produce(data);
}

/**
 * reduce data with respect to restmap
 * @param restmap - restmap string to reduce the data
 * @param data - the actual data to be reduced
 * @param unavailable - if a key is provided in restmap but doesn't exist in actual data
 *                      then this will be the value of that key; default is {}
 */
export function reduceData(
    restmap: string,
    data: any,
    unavailable: any = {},
): object {
    // check if restmap is a string
    if (typeOf(restmap) === STRING) {
        // verify the map
        const imap = parse(restmap);
        // validate that data is a json object
        validateJSON(data, "data must be a JSON object/array");
        // reduce & return
        return minimize(imap, data, unavailable);
    } else throw new Error("restmap must be a string");
}
