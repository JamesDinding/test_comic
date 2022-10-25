import { h, FunctionComponent, Fragment as F } from "preact";
import { useState } from "preact/hooks";

type PurchaseItem = {
  amount: number;
  balance: number;
  description: string;
  created_at: string;
};

interface PurchaseItemProps {
  purchaseObj: PurchaseItem;
}

const PurchaseItem: FunctionComponent<PurchaseItemProps> = ({
  purchaseObj,
}) => {
  const [isDrop, setIsDrop] = useState(false);
  const dropCss = isDrop ? "h-[72px]" : "invisible h-0";

  return (
    <F>
      <div
        className={
          "cursor-pointer w-full h-[49px] px-5 leading-[49px] flex items-center justify-between text-sm text-[#79727d] border-solid border-b-[1px] " +
          (isDrop ? "border-[#6d569419]" : "border-[#6d569466]")
        }
        onClick={() => setIsDrop((prev) => !prev)}
      >
        <div className="w-2/5 text-center text-[#4fa7dd] font-semibold whitespace-nowrap">
          {purchaseObj.amount} 金币
        </div>
        <div className="grow text-center">余 {purchaseObj.balance} 金币</div>
        <div className="flex items-center justify-end">
          <div
            className={
              "w-0 h-0 border-t-[6px] border-[6px] border-transparent border-t-[#6d569499] translate-y-[3px] origin-[50%_25%] duration-300 " +
              (isDrop ? "rotate-[180deg]" : "")
            }
          />
        </div>
      </div>
      <div
        className={`w-full px-5 text-sm text-[#666666] flex flex-col justify-center tracking-wide border-solid border-b-[1px] border-[#9e765466] duration-300 overflow-hidden ${dropCss}`}
      >
        <div className="mt-2 mb-1">购买项目 : {purchaseObj.description}</div>
        <div className="mb-2">时间 : {purchaseObj.created_at}</div>
      </div>
    </F>
  );
};

export default PurchaseItem;
