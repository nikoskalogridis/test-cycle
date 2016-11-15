/*jslint
    es6
*/

/*property
    DOM, combine, compose, history, map, merge, onion, state$, vnodes
*/

import xs from "xstream";
import isolate from "@cycle/isolate";
import {pick, mix} from "cycle-onionify";
import intent from "./intent";
import model from "./model";
import viewModel from "./view-model";
import view from "./view";
import Customer from "../Customer";

function Children(sources) {
    const array$ = sources.onion.state$;
    const customerSinks$ = array$.map((array) => array.map((ignore, i) => isolate(Customer, i)(sources)));

    const vnodes$ = customerSinks$
        .compose(pick((sinks) => sinks.DOM))
        .compose(mix(xs.combine));
    const reducer$ = customerSinks$
        .compose(pick((sinks) => sinks.onion))
        .compose(mix(xs.merge));

    const sinks = {
        vnodes: vnodes$,
        onion: reducer$
    };
    return sinks;
}

export default function CustomerList(sources) {
    const state$ = sources.onion.state$;
    const action$ = intent(sources.DOM);
    const parentReducer$ = model(action$);

    const childrenSinks$ = isolate(Children, "list")(sources);
    const childrenVNodes$ = childrenSinks$.vnodes;
    const childrenReducer$ = childrenSinks$.onion;
    const viewState$ = viewModel(state$, childrenVNodes$);
    const vdom$ = view(viewState$);
    const reducer$ = xs.merge(parentReducer$, childrenReducer$);

    const sinks = {
        DOM: vdom$,
        onion: reducer$
    };
    return sinks;
}