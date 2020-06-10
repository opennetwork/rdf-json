import {
    Quad,
    Literal,
    isLiteral, QuadSubject, QuadPredicate, QuadGraph
} from "@opennetwork/rdf-data-model"
import { isMatch, QuadFind } from "@opennetwork/rdf-dataset"
import mime from "@opennetwork/rdf-namespace-mime"

export interface JSONObject extends Literal<string, "", typeof mime.json> {

}

export interface JSONQuad<OT, S extends QuadSubject = QuadSubject, P extends QuadPredicate = QuadPredicate, G extends QuadGraph = QuadGraph> extends Quad<S, P, JSONObject, G> {

}

export function encode<S extends QuadSubject, P extends QuadPredicate, OT, G extends QuadGraph>(subject: S, predicate: P, value: OT, graph: G): JSONQuad<OT, S, P, G> {
    return new Quad(
        subject,
        predicate,
        new Literal(
            JSON.stringify(value),
            "",
            mime.json
        ),
        graph
    )
}

export function decode<OT>(quad: JSONQuad<OT>): OT {
    return JSON.parse(quad.object.value)
}

export function isJSONQuad<T = any>(quad: Quad): quad is JSONQuad<T> {
    return !!(
        isLiteral(quad.object) &&
        quad.object.datatype &&
        quad.object.datatype.equals(mime.json) &&
        // All JSON values have at least one character to encode it
        quad.object.value &&
        quad.object.value.length
    )
}

// This is so the end user can bind the type of <T>, but if they have their own `is` function declared for their type
// they can pass that as a filter
export function createJSONQuadFilter<T = any>(find: Omit<QuadFind, "object">): (quad: Quad) => quad is JSONQuad<T> {
    return (quad: Quad): quad is JSONQuad<T> => {
        return isJSONQuad<T>(quad) && isMatch(quad, find)
    }
}
