import { h, FunctionalComponent } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { useCharge } from "../../../../context/charge";
import IconChevron from "../../../../resources/img/icon-chevron.svg";

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
  const { payments, userSelect, selectPay } = useCharge();

  return (
    <div
      className={
        "charge-input-container overflow-y-auto duration-300 " +
        (isExpand ? "bg-[#fef4e7]" : "")
      }
    >
      <div className="flex items-center">
        {userSelect.pay === payInfo.pay && userSelect.p_way
          ? payInfo.pay.concat(" / ", userSelect.p_way)
          : payInfo.pay}
        <div>
          <img src={`/assets/img/payment/pay${payInfo.p_id}`} />
        </div>
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
        {payInfo.p_way.map((p, i) => {
          return (
            <div className="mt-5">
              <div>
                <label
                  className="cursor-pointer"
                  onClick={() => {
                    selectPay(payInfo.pay, "123", p);
                  }}
                >
                  <input
                    className="mr-2.5"
                    type="radio"
                    name={"foo"}
                    value={p}
                  />
                  {p}
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
