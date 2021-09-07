/**
 * @info reduce the original data with map
 * @param imap: internal map
 * @param data: original data to reduce
 */
import { typeOf } from "./utils/extra";
import { ARRAY, OBJECT } from "./utils/constant";

export default function reduce(imap: object, data: any, unavailable: any = {}) {
    // it is an array
    if (typeOf(data) == ARRAY) {
        const newData = [];

        // work on individual elements
        data.forEach((el) => {
            // parse and push each element in new array
            newData.push(reduce(imap, el));
        });

        return newData;

        // it is an object
    } else
        if (typeOf(data) == OBJECT) {
        const newData = {};

        // keys of map
        const keys = Object.keys(imap);

        // for every key in map
        keys.forEach((key) => {
            // store the map value at the key
            const mvalue = imap[key];

            // if key does exist in data
            if (data[key] !== undefined) {
                // if map value is object (map value will be either true or object)
                if (typeOf(mvalue) == OBJECT) {
                    // if data value is object/array (parse recursively)
                    if (
                        typeOf(data[key]) == OBJECT ||
                        typeOf(data[key]) == ARRAY
                    )
                        newData[key] = reduce(mvalue, data[key]);
                    // else data value is of other type than expected
                    else newData[key] = unavailable;

                    // if map value not object then copy the whole obj
                }
                else newData[key] = data[key];

                // else key does not exist in data
                // store undefined object
            }
            else newData[key] = unavailable;
        });

        return newData;
    }
}
