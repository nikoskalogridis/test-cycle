/*jslint
    es6
*/
import sampleCombine from "xstream/extra/sampleCombine";

function search(key, value) {
    return value && key && value.indexOf(key) === 0;
}

export default function viewModel(state$, customerVNodes$) {
    return customerVNodes$
        .compose(sampleCombine(state$))
        .map(function ([customerVNodes, state]) {
            const visibleVNodes = state.list
                .map(function (customer, i) {
                    if (state.searchText) {
                        if (search(state.searchText, customer.phone)) {
                            return customerVNodes[i];
                        } else {
                            return null;
                        }
                    }
                    return state.filterFn(customer)
                        ? customerVNodes[i]
                        : null;
                })
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
