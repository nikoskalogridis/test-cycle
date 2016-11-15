/*jslint
    es6
*/

import {button, ul, span, i, div, header, a, nav, main} from "@cycle/dom";
import styles from "./styles.css";

function view(customers$) {
    return customers$.map(function (customers) {
        return div(
            ".mdl-layout.mdl-js-layout.mdl-layout--fixed-header",
            [
                header(
                    ".mdl-layout__header",
                    [
                        div(
                            ".mdl-layout__header-row",
                            [
                                span(
                                    ".mdl-layout__title",
                                    "Customers"// (${customers.visibleCount} από ${customers.list.length})`
                                    //"Πελάτες (" + customers.visibleCount + " από " + customers.list.length + ")"
                                ),
                                div(".mdl-layout-spacer")
                                // nav(
                                //     "mdl-navigation",
                                //     [
                                //         button(
                                //             `.mdl-button
                                //             .mdl-js-button
                                //             .mdl-js-ripple-effect
                                //             .refresh-customers-action`,
                                //             [
                                //                 i(
                                //                     ".material-icons",
                                //                     "refresh"
                                //                 )
                                //             ]
                                //         )
                                //     ]
                                // )
                            ]
                        )
                    ]
                ),
                div(
                    ".mdl-layout__drawer",
                    [
                        span(
                            ".mdl-layout-title",
                            "Cycle app"
                        ),
                        nav(
                            ".mdl-navigation",
                            [
                                a(
                                    ".mdl-navigation__link",
                                    {
                                        attrs: {
                                            href: ""
                                        }
                                    },
                                    "Customers"
                                )
                            ]
                        )
                    ]
                ),
                main(
                    ".mdl-layout__content",
                    [
                        button(
                            `.mdl-button
                            .mdl-js-button
                            .mdl-button--fab
                            .mdl-js-ripple-effect
                            .mdl-button--colored
                            .${styles.addFAB}
                            .add-customer-action`,
                            [
                                i(
                                    ".material-icons",
                                    "add"
                                )
                            ]
                        ),
                        div(
                            ".page-content",
                            [
                                ul(
                                    ".mdl-list",
                                    customers.customerVNodes
                                )
                            ]
                        )
                    ]
                )
            ]
        );
    });
}

export default view;
