import { h, FunctionComponent, Fragment as F } from "preact";
import { useState } from "preact/hooks";

const statusTable = new Map();
statusTable.set("completed", "完成");
statusTable.set("pending", "等待");
statusTable.set("cancel", "失敗");

type ChargeItem = {
  id: string;
  date: string;
  coinsCharged: number;
  cashPaid: number;
  status: string;
};

interface ChargeItemProps {
  chargeObj: ChargeItem;
}

const ChargeItem: FunctionComponent<ChargeItemProps> = ({ chargeObj }) => {
  const [isDrop, setIsDrop] = useState(false);
  const dropCss = isDrop ? "h-[72px]" : "invisible h-0";

  return (
    <F>
      <div
        className={
          "w-full h-[49px] px-5 leading-[49px] flex text-sm text-[#79727d] border-solid border-b-[1px] " +
          (isDrop ? "border-[#f8f8f8]" : "border-[#bbbbbb]")
        }
      >
        <div className="w-1/3 text-center text-[#ecad1d] font-semibold tracking-wide">
          +&nbsp;&nbsp;{chargeObj.coinsCharged} 金幣
        </div>
        <div className="w-1/3 text-center">&#165; {chargeObj.cashPaid}</div>
        <div className="w-1/3 flex items-center justify-between">
          <div className="grow text-center">
            {statusTable.get(chargeObj.status)}
          </div>
          <div
            className={
              "w-0 h-0 border-t-[6px] border-[6px] border-transparent border-t-[#9e7654] translate-y-[3px] origin-[50%_25%] duration-300 " +
              (isDrop ? "rotate-[180deg]" : "")
            }
            onClick={() => setIsDrop((prev) => !prev)}
          />
        </div>
      </div>
      <div
        className={`w-full px-5 text-sm text-[#666666] flex flex-col justify-center tracking-wide border-solid border-b-[1px] border-[#bbbbbb] duration-300 overflow-hidden ${dropCss}`}
      >
        <div className="mt-2 mb-1">單號 : {chargeObj.id}</div>
        <div className="mb-2">時間 : {chargeObj.date}</div>
      </div>
    </F>
  );
};

export default ChargeItem;
