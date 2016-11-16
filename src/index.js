/*jslint
    es6
*/

import {run} from "@cycle/xstream-run";
import {makeDOMDriver} from "@cycle/dom";
import onionify from "cycle-onionify";
//import storageify from "cycle-storageify";
//import storageDriver from "@cycle/storage";
import CustomersList from "./component/customers-list";

const drivers = {
    DOM: makeDOMDriver("#app")//,
    //storage: storageDriver
};

//run(onionify(storageify(CustomersList, {key: "my-customers-storage-key"})), drivers);
run(onionify(CustomersList), drivers);
