import { h, FunctionalComponent } from "preact";

const Card: FunctionalComponent = ({ children }) => {
  return <div className="modal">{children}</div>;
};

export default Card;
