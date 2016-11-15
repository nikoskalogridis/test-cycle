/*jslint
    es6
*/

import xs from "xstream";

function model(action$) {
    const defaultReducer$ = xs.of(function defaultReducer(prevState) {
        if (prevState === undefined) {
            // Parent didn't provide state for the child, so initialize it.
            return {
                id: "mytestsid",
                name: {
                    full: "Nikos Kalogridis"
                },
                phone: "6947001002"
            };
        } else {
            return prevState; // Let's just use the state given from the parent.
        }
    });

    const deleteReducer$ = action$
        .filter((action) => action.type === "DELETE")
        .map(() => function destroyReducer() {
            return undefined;
        });

    const selectReducer$ = action$
        .filter((action) => action.type === "SELECT")
        .map(() => function toggleSelect(data) {
            return Object.assign({}, data, {selected: !data.selected});
        });

    return xs.merge(
        defaultReducer$,
        deleteReducer$,
        selectReducer$
    );
}

export default model;
