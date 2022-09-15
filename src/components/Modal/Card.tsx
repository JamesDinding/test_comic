import { h, FunctionalComponent } from "preact";

interface CardProps {
  heightShrink?: boolean;
}

const Card: FunctionalComponent<CardProps> = ({ children, heightShrink }) => {
  return (
    <div className={"modal" + (heightShrink ? "-shrink" : "")}>{children}</div>
  );
};

export default Card;
