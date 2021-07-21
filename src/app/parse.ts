/**
 * @info parse map string
 */

/**
 * reduce data with map
 * @param map
 * @param data
 */
export function reduce(map: string, data: object) {}

/**
 * parse map string to internal object
 * @param {string} map - original map string
 * @return {object} - internal map
 */
export function parse(map: string): object {
    map = map.replace(/{/g, '{"');
    map = map.replace(/}/g, '":true}');
    map = map.replace(/{"/g, '":{"');
    map = map.slice(2);
    map = map.replace(/,/g, '","');
    map = map.replace(/,/g, ":true,");
    map = map.replace(/}":true/g, "}");
    map = map.replace(/{"":true}/g, "{}");

    return JSON.parse(map);
}
