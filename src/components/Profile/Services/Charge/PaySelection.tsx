import { h, FunctionalComponent } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { useCharge } from "../../../../context/charge";
import IconChevron from "../../../../resources/img/icon-chevron.svg";

type PayInfo = {
  id: number;
  name: string;
  type: string;
};

//  支付/ID/线路
interface PaySelectionProps {
  payInfo: PayInfo[];
  isExpand: boolean;
}

const PaySelection: FunctionalComponent<PaySelectionProps> = ({
  payInfo,
  isExpand,
}) => {
  const { selectPay } = useCharge();

  return (
    <div className={"charge-input-container overflow-y-auto duration-300 "}>
      <div className="flex items-center">
        <div className="mr-2.5">
          <img
            src={`/assets/img/payment/pay${payInfo[0].type}.png`}
            className="h-5 w-5"
          />
        </div>
        {payInfo[0].type}
        <div className="grow"></div>
        <div>
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
                    selectPay(p);
                  }}
                >
                  <input
                    className="mr-2.5"
                    type="radio"
                    name={"foo"}
                    value={p.name}
                  />
                  {p.name}
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
