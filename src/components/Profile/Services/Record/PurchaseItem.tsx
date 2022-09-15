import { h, FunctionComponent, Fragment as F } from "preact";
import { useState } from "preact/hooks";

type PurchaseItem = {
  title: string;
  date: string;
  coinsCost: number;
  coinsRemained: number;
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
          "w-full h-[49px] px-5 leading-[49px] flex items-center justify-between text-sm text-[#79727d] border-solid border-b-[1px] " +
          (isDrop ? "border-[#f8f8f8]" : "border-[#bbbbbb]")
        }
      >
        <div className="w-2/5 text-center text-[#4fa7dd] font-semibold whitespace-nowrap">
          - {purchaseObj.coinsCost} 金幣
        </div>
        <div className="grow text-center">
          餘 {purchaseObj.coinsRemained} 金幣
        </div>
        <div className="flex items-center justify-end">
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
        <div className="mt-2 mb-1">購買項目 : {purchaseObj.title}</div>
        <div className="mb-2">時間 : {purchaseObj.date}</div>
      </div>
    </F>
  );
};

export default PurchaseItem;