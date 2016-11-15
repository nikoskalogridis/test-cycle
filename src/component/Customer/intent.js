/*jslint
    es6
*/

import xs from "xstream";

function intent(DOMSource) {
    const deleteAction$ = DOMSource
        .select(".delete-customer-action")
        .events("click")
        .mapTo({type: "DELETE"});

    const selectAction$ = DOMSource
        .select(".select-customer-action")
        .events("click")
        .mapTo({type: "SELECT"});

    return xs.merge(deleteAction$, selectAction$);
}

export default intent;
