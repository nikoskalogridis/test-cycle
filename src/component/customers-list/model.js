/*jslint
    es6
*/

//import lodash from "lodash";
import xs from "xstream";
//import customers from "./customers.mock.json";

function actionFilter(type) {
    return function (action) {
        return action.type === type;
    };
}

function model(action$) {
    const initialReducer$ = xs.of(function initialReducer() {
        return {
            filterFn: () => true,
            list: []
            // list: lodash(customers)
            //     .filter(function (customer) {
            //         return customer.entryType !== "walkin";
            //     })
            //     .map(function (customer) {
            //         return {
            //             id: customer._id,
            //             name: {
            //                 full: customer.name.first + " " + customer.name.last
            //             },
            //             phone: customer.phone
            //         };
            //     })
            //     .sortBy((customer) => customer.name.full)
            //     .take(1)
            //     .value()
        };
    });

    const addCustomerReducer$ = action$
        .filter(actionFilter("ADD"))
        .map((action) => function addCustomer(prevState) {
            return Object.assign(
                {},
                prevState,
                {
                    list: prevState.list.concat(action.data)
                }
            );
        });

    const refreshReducer$ = action$
        .filter(actionFilter("REFRESH"))
        .map(() => function refreshCustomers(prevState) {
            return Object.assign(
                {},
                prevState,
                {
                    filterFn: function (customer) {
                        return customer.phone && customer.phone.indexOf("694") === 0;
                    }
                }
            );
        });

    return xs.merge(
        initialReducer$,
        addCustomerReducer$,
        refreshReducer$
    );
}

export default model;
