import { h, FunctionalComponent } from "preact";

interface CardProps {
  heightShrink?: boolean;
  heightDynamic?: boolean;
}

const Card: FunctionalComponent<CardProps> = ({
  children,
  heightShrink,
  heightDynamic,
}) => {
  let css = (heightShrink ? "" : " min-h-[515px] h-[80%] ") + "modal";

  return (
    <div className={heightDynamic ? "modal-dynamic" : css}>{children}</div>
  );
};

export default Card;
