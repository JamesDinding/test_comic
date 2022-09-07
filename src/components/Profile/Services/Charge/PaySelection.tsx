import { h, FunctionalComponent } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

type PayInfo = {
  pay: string;
  p_id: string;
  p_way: Array<string>;
};

//  支付/ID/線路
interface PaySelectionProps {
  payInfo: PayInfo;
  isExpand: boolean;
}

const PaySelection: FunctionalComponent<PaySelectionProps> = ({
  payInfo,
  isExpand,
}) => {
  return (
    <div
      className={"charge-input-container " + (isExpand ? "bg-[#fef4e7]" : "")}
    >
      <div>{payInfo.pay}</div>
      <div
        className={
          "flex flex-col items-start overflow-y-auto no-scrollbar duration-300 " +
          (isExpand ? "h-[10rem]" : "h-0")
        }
      >
        {payInfo.p_way.map((p, i) => {
          return (
            <div className="mt-5">
              <label className="cursor-pointer">
                <input className="mr-2.5" type="radio" name={"foo"} value={p} />
                {p}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaySelection;
