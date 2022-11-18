import { h, FunctionalComponent } from "preact";
import { useState, useEffect, useRef, StateUpdater } from "preact/hooks";
import { useCharge } from "../../../../context/charge";
import IconChevron from "../../../../resources/img/icon-chevron.svg";
import IconAlipay from "../../../../resources/img/payway/alipay.svg";
import IconUnionpay from "../../../../resources/img/payway/unionpay.svg";
import IconUsdt from "../../../../resources/img/payway/usdt.svg";
import IconWechat from "../../../../resources/img/payway/wechat.svg";
import IconGash from "../../../../resources/img/payway/gash.svg";

const iconMap: Map<any, { title: string; element: h.JSX.Element }> = new Map();
iconMap.set("ALIPAY", {
  title: "支付寶",
  element: <IconAlipay class="h-5 w-5" />,
});
iconMap.set("USDT", { title: "USDT", element: <IconUsdt class="h-5 w-5" /> });
iconMap.set("WECHAT", {
  title: "微信",
  element: <IconWechat class="h-5 w-5" />,
});
iconMap.set("TWD", {
  title: "GASH",
  element: <IconGash class="h-5 w-5" />,
});

type PayInfo = {
  id: number;
  method_id: number;
  name: string;
  type: string;
  bonus_text?: string;
};

//  支付/ID/线路
interface PaySelectionProps {
  payInfo: PayInfo[];
  isExpand: boolean;
  dev_showId: boolean;
  onNext: () => void;
  onClose: () => void;
}

const PaySelection: FunctionalComponent<PaySelectionProps> = ({
  payInfo,
  isExpand,
  dev_showId,
  onNext,
  onClose,
}) => {
  const { selectPay, payment } = useCharge();
  const [selectIndex, setSelectIndex] = useState(0);
  const [selectName, setSelectName] = useState("");

  const [isFold, setIsFold] = useState(false);

  const expandHeight =
    isExpand && !isFold ? ((payInfo.length + 1) * 40).toString() : "40";

  return (
    <div
      className={
        "cursor-pointer charge-input-container duration-300 overflow-hidden "
      }
      style={{ height: expandHeight + "px" }}
    >
      <div
        className="flex items-center"
        onClick={() => setIsFold((prev) => !prev)}
      >
        <div className="mr-2.5 w-5">
          {iconMap.get(payInfo[0].type)?.element}
        </div>
        <div className="book-oneline">
          {iconMap.get(payInfo[0].type)?.title +
            (payment?.name === selectName ? " / 分流 " + selectIndex : "")}
        </div>
        <div className="grow"></div>
        <div className="cursor-pointer">
          <IconChevron
            class={
              "h-4 duration-300 " +
              (isExpand && !isFold ? "rotate-90" : "-rotate-90")
            }
          />
        </div>
      </div>
      <div
        className={
          "flex flex-col items-start overflow-hidden " +
          (isExpand ? "max-h-full" : "max-h-[0px]")
        }
      >
        {payInfo.map((p, i) => {
          return (
            <div className="mt-5 w-full">
              <label
                className="cursor-pointer"
                onClick={() => {
                  setSelectIndex(i + 1);
                  setSelectName(p.name);
                  selectPay({ ...p, index: i + 1 });
                  onNext();
                  onClose();
                }}
              >
                <input
                  className="mr-2.5"
                  type="radio"
                  name={"foo"}
                  value={selectName}
                />
                分流&nbsp;{i + 1}&nbsp;{dev_showId ? `(${p.method_id})` : ""}
                {p.bonus_text && (
                  <div className="inline text-left text-[#ff978d] leading-[10px] text-[10px] whitespace-nowrap">
                    {p.bonus_text}
                  </div>
                )}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaySelection;
