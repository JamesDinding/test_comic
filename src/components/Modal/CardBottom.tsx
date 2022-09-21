import { h, FunctionalComponent } from "preact";

interface CardBottomProps {
  customCss?: string;
}

// 需要再其parent 給relative
const CardBottom: FunctionalComponent<CardBottomProps> = ({
  children,
  customCss = "",
}) => {
  return <div className={customCss + " modal-bottom bg-white"}>{children}</div>;
};

export default CardBottom;
