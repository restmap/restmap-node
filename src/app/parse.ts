/**
 * @info parse map string
 */

/**
 * parse map string to internal object
 * @param {string} map - original map string
 * @return {object} - internal map
 */
export default function (map: string): object {
    map = map.replace(/{/g, '{"');
    map = map.replace(/}/g, '":true}');
    map = map.replace(/{"/g, '":{"');
    map = map.slice(2);
    map = map.replace(/,/g, '","');
    map = map.replace(/,/g, ":true,");
    map = map.replace(/}":true/g, "}");
    map = map.replace(/{"":true}/g, "{}");

    try {
        return JSON.parse(map);
    } catch (e) {
        throw new Error("invalid map");
    }
}
