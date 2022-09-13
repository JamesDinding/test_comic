import { h, FunctionalComponent } from "preact";

interface CardBottomProps {
  customCss?: string;
  footerOffset?: false;
}

// 需要再其parent 給relative
const CardBottom: FunctionalComponent<CardBottomProps> = ({
  children,
  customCss = "",
  footerOffset,
}) => {
  return (
    <div
      className={
        customCss +
        (footerOffset ? " bottom-[-60px]" : " bottom-0") +
        " modal-bottom bg-white"
      }
    >
      {children}
    </div>
  );
};

export default CardBottom;
