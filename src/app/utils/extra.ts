/**
 * @info extra utility functions
 */

import { ANY, ARRAY, OBJECT, STRING } from "./constant";

/**
 * Used to check if data type is json or not
 * @param data
 * @return {string}
 */
const typeOf = function (data): string {
    const objectConstructor = {}.constructor;
    const arrayConstructor = [].constructor;
    const stringConstructor = "test".constructor;
    if (data && data.constructor === objectConstructor) {
        return OBJECT;
    } else if (data && data.constructor === arrayConstructor) {
        return ARRAY;
    } else if (data && data.constructor === stringConstructor) {
        return STRING;
    } else {
        return ANY;
    }
};
