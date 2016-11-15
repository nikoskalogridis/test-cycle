/*jslint
    es6
*/

import xs from "xstream";

function intent(DOMSource) {
    const addActions$ = DOMSource
        .select(".add-customer-action")
        .events("click")
        .mapTo(
            {
                type: "ADD",
                data: {
                    id: "34534223624254645",
                    name: {
                        full: "Nikos Kalogridis"
                    },
                    phone: "xxxx001001"
                }
            }
        );
    const refreshAction$ = DOMSource
        .select(".refresh-customers-action")
        .events("click")
        .mapTo({type: "REFRESH"});
    return xs.merge(addActions$, refreshAction$);
}

export default intent;
