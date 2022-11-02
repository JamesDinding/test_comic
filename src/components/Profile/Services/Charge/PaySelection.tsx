import { h, FunctionalComponent } from "preact";
import { useState, useEffect, useRef, StateUpdater } from "preact/hooks";
import { useCharge } from "../../../../context/charge";
import IconChevron from "../../../../resources/img/icon-chevron.svg";
import IconAlipay from "../../../../resources/img/payway/alipay.svg";
import IconUnionpay from "../../../../resources/img/payway/unionpay.svg";
import IconUsdt from "../../../../resources/img/payway/usdt.svg";
import IconWechat from "../../../../resources/img/payway/wechat.svg";

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

type PayInfo = {
  id: number;
  name: string;
  type: string;
};

//  支付/ID/线路
interface PaySelectionProps {
  payInfo: PayInfo[];
  isExpand: boolean;
  setCurExpand: StateUpdater<number>;
}

const PaySelection: FunctionalComponent<PaySelectionProps> = ({
  payInfo,
  isExpand,
  setCurExpand,
}) => {
  const { selectPay, payment } = useCharge();
  const [selectName, setSelectName] = useState("");

  const expandHeight = isExpand ? ((payInfo.length + 1) * 40).toString() : "40";

  return (
    <div
      className={
        "cursor-pointer charge-input-container duration-300 overflow-hidden "
      }
      style={{ height: expandHeight + "px" }}
    >
      <div className="flex items-center">
        <div className="mr-2.5 w-5">
          {iconMap.get(payInfo[0].type)?.element}
        </div>
        <div className="book-oneline">
          {iconMap.get(payInfo[0].type)?.title +
            (payment?.name === selectName ? "/" + selectName : "")}
        </div>
        <div className="grow"></div>
        <div
          className="cursor-pointer"
          onClick={(e) => {
            if (!isExpand) return;
            setCurExpand(-1);
            e.stopPropagation();
          }}
        >
          <IconChevron
            class={
              "h-4 duration-300 " + (isExpand ? "rotate-90" : "-rotate-90")
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
            <div className="mt-5">
              <div>
                <label
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectName(p.name);
                    selectPay({ ...p, index: i + 1 });
                  }}
                >
                  <input
                    className="mr-2.5"
                    type="radio"
                    name={"foo"}
                    value={p.name}
                  />
                  {/* {p.name} */}
                  分流 {i + 1}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaySelection;
