import { h, FunctionalComponent } from "preact";

interface CardProps {
  heightShrink?: boolean;
  dynamicHeight?: boolean;
}

const Card: FunctionalComponent<CardProps> = ({
  children,
  heightShrink,
  dynamicHeight,
}) => {
  let css = "modal" + (heightShrink ? "-shrink" : "");

  return (
    <div className={css + (dynamicHeight ? " max-h-2/3" : " ")}>{children}</div>
  );
};

export default Card;
