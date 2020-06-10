import { Quad, Literal, QuadSubject, QuadPredicate, QuadGraph } from "@opennetwork/rdf-data-model";
import { QuadFind } from "@opennetwork/rdf-dataset";
import mime from "@opennetwork/rdf-namespace-mime";
export interface JSONObject extends Literal<string, "", typeof mime.json> {
}
export interface JSONQuad<OT, S extends QuadSubject = QuadSubject, P extends QuadPredicate = QuadPredicate, G extends QuadGraph = QuadGraph> extends Quad<S, P, JSONObject, G> {
}
export declare function encode<S extends QuadSubject, P extends QuadPredicate, OT, G extends QuadGraph>(subject: S, predicate: P, value: OT, graph: G): JSONQuad<OT, S, P, G>;
export declare function decode<OT>(quad: JSONQuad<OT>): OT;
export declare function isJSONQuad<T = any>(quad: Quad): quad is JSONQuad<T>;
export declare function createJSONQuadFilter<T = any>(find: Omit<QuadFind, "object">): (quad: Quad) => quad is JSONQuad<T>;
