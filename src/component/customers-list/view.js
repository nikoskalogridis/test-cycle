/*jslint
    es6
*/

import {button, ul, span, i, div, header, a, nav, main, input, label} from "@cycle/dom";
//import {Button as but} from "snabbdom-material";
import styles from "./styles.css";
import i18next from "i18next";

i18next.init(
    {
        lng: "en",
        resources: {
            el: {
                translation: {
                    "Customers": "Πελάτες",
                    "from": "από"
                }
            },
            en: {
                translation: {
                    "Customers": "Customers",
                    "from": "from"
                }
            }
        }
    }
);

function view(customers$) {
    return customers$.map(function (customers) {
        const selectedCount = customers.list.filter((customer) => customer.selected).length;
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
                                    i18next.t("Customers")
                                    //"Customers"// (${customers.visibleCount} από ${customers.list.length})`
                                    //"Πελάτες (" + customers.visibleCount + " από " + customers.list.length + ")"
                                ),
                                div(".mdl-layout-spacer"),
                                (
                                    selectedCount > 0
                                        ? nav(
                                            "mdl-navigation",
                                            [
                                                button(
                                                    `.mdl-button
                                                    .mdl-js-button
                                                    .mdl-js-ripple-effect
                                                    .delete-multiple-customers-action`,
                                                    [
                                                        i(
                                                            ".material-icons",
                                                            "delete"
                                                        )
                                                    ]
                                                )
                                            ]
                                        )
                                        : div(
                                            ".mdl-textfield.mdl-js-textfield.mdl-textfield--expandable.mdl-textfield--floating-label.mdl-textfield--align-right",
                                            {
                                                hook: {
                                                    insert: function (vnode) {
                                                        componentHandler.upgradeElement(vnode.elm);
                                                    }
                                                }
                                            },
                                            [
                                                label(
                                                    ".mdl-button.mdl-js-button.mdl-button--icon",
                                                    {
                                                        attrs: {
                                                            for: "search_header_input"
                                                        }
                                                    },
                                                    [
                                                        i(
                                                            ".material-icons",
                                                            "search"
                                                        )
                                                    ]
                                                ),
                                                div(
                                                    ".mdl-textfield__expandable-holder",
                                                    [
                                                        input(
                                                            "#search_header_input.mdl-textfield__input.search_text_box",
                                                            {
                                                                props: {
                                                                    type: "text",
                                                                    value: customers.searchText
                                                                }
                                                            }
                                                        )
                                                    ]
                                                )
                                            ]
                                        )
                                )
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
                        )//,
                        // but(
                        //     {primary: true, type: "submit", extraClass: {test: true}},
                        //     [
                        //         i(
                        //             ".material-icons",
                        //             "add"
                        //         )
                        //     ]
                        // )
                    ]
                )
            ]
        );
    });
}

export default view;
