/**
 * @info reduce the original data with map
 * @param imap: internal map
 * @param data: original data to reduce
 */
import { typeOf } from "./utils/extra";
import { ARRAY, OBJECT } from "./utils/constant";

export default function reduce(
    imap: object,
    data: any,
    escape: string = "-",
    unavailable: any = {},
) {
    // it is an array
    if (typeOf(data) == ARRAY) {
        const newData = [];

        // work on individual elements
        data.forEach((el) => {
            // parse and push each element in new array
            newData.push(reduce(imap, el, escape, unavailable));
        });

        return newData;
    }
    // it is an object
    else {
        let newData = {};
        let escaped = false;

        // keys of map
        const keys = Object.keys(imap);

        // for every key in map
        keys.forEach((key) => {
            // store the map value at the key
            const mvalue = imap[key];

            // check if any key is escape
            if (key.charAt(0) === escape) {
                // check if escaped not already worked
                if (!escaped) {
                    // add all data to newData & mark escaped
                    newData = data;
                    escaped = true;
                }

                // remove the escape char from key
                const ekey = key.substr(1, key.length);
                // delete the given key from newData
                delete newData[ekey];
            }
            // if key does exist in data
            else if (data[key] !== undefined) {
                // if map value is object (map value will be either true or object)
                if (typeOf(mvalue) == OBJECT) {
                    // if data value is object/array (parse recursively)
                    if (
                        typeOf(data[key]) == OBJECT ||
                        typeOf(data[key]) == ARRAY
                    )
                        newData[key] = reduce(
                            mvalue,
                            data[key],
                            escape,
                            unavailable,
                        );
                    // else data value is of other type than expected
                    else newData[key] = unavailable;

                    // if map value not object then copy the whole obj
                } else newData[key] = data[key];

                // else key does not exist in data
                // store undefined object
            } else newData[key] = unavailable;
        });

        return newData;
    }
}
