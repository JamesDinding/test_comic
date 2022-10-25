import { FunctionalComponent, h } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import { useCharge } from "../../../../context/charge";
import ModalTitle from "../../../UI/ModalTitle";
import PaySelection from "./PaySelection";
import Card from "../../../Modal/Card";
import IconCross from "../../../../resources/img/icon-cross.svg";
import { getOrdersProductsId } from "../../../../lib/api";

type Payment = {
  name: string;
  id: number;
};

interface PopPaymentkDrop {
  onClose: () => void;
  onNextConfirm: () => void;
}
interface PayListProps {
  payList: Array<Payment>;
}

const PopPayment: FunctionalComponent<PopPaymentkDrop> = ({
  onClose,
  onNextConfirm,
}) => {
  const { payment, userSelect, selectPay, selectCoins } = useCharge();
  const [curExpand, setCurExpand] = useState(-1);
  const [payments, setPayments] = useState<any>([]);
  const [way, setWay] = useState<any>([]);

  useEffect(() => {
    getOrdersProductsId(userSelect.id.toString())
      .then((response) => {
        const { data } = response;
        setWay(Object.keys(data));
        setPayments(data);
      })
      .catch((err) => {
        console.log(err.message || "failed");
      });
  }, []);

  return (
    <Card>
      <div className="relative overflow-auto no-scrollbar flex flex-col items-center h-full p-5">
        <ModalTitle
          title="选择支付方案"
          onClose={() => {
            selectPay(null);
            selectCoins(null);
            onClose();
          }}
        />
        <div className="relative w-full h-2/3">
          <div className="payment-shadow"></div>
          <div className="h-full px-1 overflow-y-auto no-scollbar bg-[#fcf6ff]">
            {way?.map((way: any, i: any) => {
              const isNowExpand = curExpand === i;
              return (
                <div
                  key={i}
                  className="w-full mt-2.5"
                  onClick={(e) => {
                    // if (curExpand === i) {
                    //   setCurExpand(-1);
                    //   return;
                    // }

                    setCurExpand(i);
                  }}
                >
                  <PaySelection
                    payInfo={payments[way]}
                    isExpand={isNowExpand}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="grow"></div>
        <button
          className="w-full py-4 text-center text-white text-lg bg-[#8d6d9f] rounded-xl"
          onClick={() => {
            console.log(payment);
            if (!payment) return;
            onClose();
            onNextConfirm();
          }}
        >
          下一步
        </button>
      </div>
    </Card>
  );
};

export default PopPayment;
