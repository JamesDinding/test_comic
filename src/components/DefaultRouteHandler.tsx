import { h, FunctionalComponent, Fragment } from "preact";
import { route } from "preact-router";

const DefaultRouteHandler: FunctionalComponent = () => {

    route("/home", true);

    return null;
}

export default DefaultRouteHandler;
