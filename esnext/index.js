import { Quad, Literal, isLiteral } from "@opennetwork/rdf-data-model";
import { isMatch } from "@opennetwork/rdf-dataset";
import mime from "@opennetwork/rdf-namespace-mime";
export function encode(subject, predicate, value, graph) {
    return new Quad(subject, predicate, new Literal(JSON.stringify(value), "", mime.json), graph);
}
export function decode(quad) {
    return JSON.parse(quad.object.value);
}
export function isJSONQuad(quad) {
    return !!(isLiteral(quad.object) &&
        quad.object.datatype &&
        quad.object.datatype.equals(mime.json) &&
        // All JSON values have at least one character to encode it
        quad.object.value &&
        quad.object.value.length);
}
// This is so the end user can bind the type of <T>, but if they have their own `is` function declared for their type
// they can pass that as a filter
export function createJSONQuadFilter(find) {
    return (quad) => {
        return isJSONQuad(quad) && isMatch(quad, find);
    };
}
//# sourceMappingURL=index.js.map