import { FunctionalComponent, h } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import { useCharge } from "../../../../context/charge";
import ModalTitle from "../../../UI/ModalTitle";
import PaySelection from "./PaySelection";
import Card from "../../../Modal/Card";
import { getOrdersProductsId } from "../../../../lib/api";

interface PopPaymentkDrop {
  onClose: () => void;
  onNextConfirm: () => void;
}

const PopPayment: FunctionalComponent<PopPaymentkDrop> = ({
  onClose,
  onNextConfirm,
}) => {
  const { payment, userSelect, selectPay, selectCoins } = useCharge();
  const [curExpand, setCurExpand] = useState(0);
  const [payments, setPayments] = useState<any>([]);
  const [way, setWay] = useState<any>([]);
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    getOrdersProductsId(userSelect.id.toString())
      .then((response) => {
        const { data } = response;
        setWay(Object.keys(data));
        setPayments(data);
      })
      .catch((err) => {
        console.error(err.message || "failed");
      });
  }, []);

  return (
    <Card heightDynamic={true}>
      {/* <div
        className={
          "expandPayment overflow-hidden " +
          (curExpand > -1 ? "h-[515px]" : "h-[400px]")
        }
      > */}
      <div className={"expandPayment overflow-hidden"}>
        <div className={"relative flex flex-col items-center h-full p-5 "}>
          <ModalTitle
            title="选择支付方案"
            onClose={() => {
              selectPay(null);
              selectCoins(null);
              onClose();
            }}
          />
          {/* <div className="w-full max-h-full overflow-y-auto no-scollbar bg-[#fcf6ff]"> */}
          <div className="w-full max-h-[310px] overflow-y-auto no-scollbar bg-[#fcf6ff]">
            <div
              id="payway"
              className="relative overflow-hidden px-1 py-2.5"
              onClick={(e) => {
                const target = e.target as HTMLDivElement;

                if (target.id === "payway") setCurExpand(-1);
                return;
              }}
            >
              <div className="payment-shadow"></div>
              {way?.map((way: any, i: any, arr: any) => {
                const isNowExpand = curExpand === i;
                return (
                  <div
                    key={i}
                    className={
                      "w-full" + (arr.length - 1 === i ? " " : " mb-2.5")
                    }
                    onClick={(e) => {
                      setCurExpand(i);
                      e.stopPropagation();
                    }}
                  >
                    <PaySelection
                      payInfo={payments[way]}
                      isExpand={isNowExpand}
                      setCurExpand={setCurExpand}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grow"></div>
          <div
            className={
              "text-[#ff978d] text-input-warning text-sm pt-4 " +
              (isWrong ? "error-shaking" : "")
            }
          >
            {isWrong ? "请选择支付方案" : ""}
          </div>
          <button
            className="w-full mt-10 py-4 text-center text-white text-lg bg-[#8d6d9f] rounded-xl "
            onClick={() => {
              if (!payment) {
                setIsWrong(true);
                return;
              }
              onClose();
              onNextConfirm();
            }}
          >
            下一步
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PopPayment;
