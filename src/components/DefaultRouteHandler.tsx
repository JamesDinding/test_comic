import { h, FunctionalComponent, Fragment } from "preact";
import { route } from "preact-router";
import { useRouter } from "../context/router";

const DefaultRouteHandler: FunctionalComponent = () => {
  const { customRouter } = useRouter();

  customRouter.push("/home", true);
  route("/home", true);

  return null;
};

export default DefaultRouteHandler;
