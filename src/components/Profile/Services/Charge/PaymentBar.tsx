import { FunctionComponent, h } from "preact";
import { StateUpdater } from "preact/hooks";

type PaymentInfo = {
  img: string;
  title: string;
};

interface PaymentBarProps {
  curSection: number;
  onSetCurSection: StateUpdater<number>;
  paymentArr: Array<PaymentInfo>;
}

const PaymentBar: FunctionComponent<PaymentBarProps> = ({
  curSection,
  paymentArr,
  onSetCurSection,
}) => {
  return (
    <div className="flex items-center w-full py-1 px-4 bg-white">
      {paymentArr.map(({ img, title }, i) => {
        const activeCss = curSection === i ? "bg-amber-100" : "";
        return (
          <div
            className={`grow rounded-lg p-1 text-center ${activeCss}`}
            onClick={() => onSetCurSection(i)}
          >
            <div className="text-center">img</div>
            <span className="text-xs">{title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentBar;
