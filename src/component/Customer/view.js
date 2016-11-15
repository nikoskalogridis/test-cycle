/*jslint
    es6
*/

import {button, li, span, i} from "@cycle/dom";
import styles from "./styles.css";

function makeCustomerListItem(customer) {
    const c = {
        class: {}
    };
    c.class[styles.selected] = customer.selected;
    return li(
        `.${styles.listItem}
         .mdl-list__item
         .mdl-list__item--two-line`,
        c,
        [
            span(
                ".mdl-list__item-primary-content",
                [
                    i(
                        `.material-icons.mdl-list__item-avatar
                        .select-customer-action`,
                        customer.selected
                            ? "check-box"
                            : "person"
                    ),
                    span(customer.name.full),
                    span(
                        ".mdl-list__item-sub-title",
                        customer.phone || customer.email
                    )
                ]
            ),
            button(
                `.mdl-button.mdl-js-button
                .mdl-button--icon
                .mdl-list__item-secondary-action
                .delete-customer-action`,
                [
                    i(
                        ".material-icons",
                        "delete"
                    )
                ]
            )
            // ),
            // button(
            //     `#${customer.id}
            //     .mdl-button
            //     .mdl-js-button
            //     .mdl-js-ripple-effect
            //     .mdl-button--icon
            //     .mdl-list__item-secondary-action`,
            //     [
            //         i(
            //             ".material-icons",
            //             "more_vert"
            //         )
            //     ]
            // ),
            // ul(
            //     `.mdl-menu
            //     .mdl-menu--bottom-right
            //     .mdl-js-menu
            //     .mdl-js-ripple-effect`,
            //     {
            //         attrs: {
            //             for: customer.id
            //         }
            //     },
            //     [
            //         li(
            //             ".mdl-menu__item.delete-customer-action",
            //             "Delete"
            //         )
            //     ]
            // )
        ]
    );
}

function view(customer$) {
    return customer$.map(makeCustomerListItem);
}

export default view;
