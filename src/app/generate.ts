/**
 * @info create new restmap from json object
 */
import { typeOf } from "./utils/extra";
import { ARRAY, OBJECT } from "./utils/constant";

/**
 * mapping of data to restmap temporary string
 * @param data - json object/array
 * @return string - temporary string
 */
function mapping(data): string {
    // if type of data is object
    if (typeOf(data) == OBJECT) {
        // get all keys of object
        const keys = Object.keys(data);
        // init restmap object
        let output = "{";
        // loop over all keys
        keys.forEach((key) => {
            // get value of key
            const d = data[key];
            // if value is object or data
            if (typeOf(d) == OBJECT || typeOf(d) == ARRAY)
                // then iterate mapping over it
                output += `${key}${mapping(d)}`;
            // else add it to restmap string
            else output += `${key},`;
        });

        // return final output
        return output + "},";

        // if data is of type array
    }
    // else it is of type array
    else {
        // if array size is great than 0
        if (data.length > 0) {
            // map the output & return
            return `${mapping(data[0])}`;
            // else return existing output
        } else return ",";
    }
}

/**
 * map json to restmap string
 *
 * @param data
 * @return string - restmap string
 */
export default function (data: object): string {
    let mappings = mapping(data);
    mappings = mappings.replace(/,}/g, "}");
    return mappings.substring(0, mappings.length - 1);
}
