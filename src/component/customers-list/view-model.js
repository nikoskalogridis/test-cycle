/*jslint
    es6
*/
import sampleCombine from "xstream/extra/sampleCombine";

export default function viewModel(state$, customerVNodes$) {
    return customerVNodes$
        .compose(sampleCombine(state$))
        .map(function ([customerVNodes, state]) {
            const visibleVNodes = state.list
                .map(
                    (customer, i) => state.filterFn(customer)
                        ? customerVNodes[i]
                        : null
                )
                .filter((vnode) => vnode !== null);

            return Object.assign(
                {},
                state,
                {
                    customerVNodes: visibleVNodes,
                    visibleCount: visibleVNodes.length
                }
            );
        });
}
