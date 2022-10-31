import { FunctionalComponent, h } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import { useCharge } from "../../../../context/charge";
import ModalTitle from "../../../UI/ModalTitle";
import PaySelection from "./PaySelection";
import Card from "../../../Modal/Card";
import IconCross from "../../../../resources/img/icon-cross.svg";
import { getOrdersProductsId } from "../../../../lib/api";
import { useUser } from "../../../../context/user";
import { route } from "preact-router";

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
  const { logout } = useUser();
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
        console.error(err.message || "failed");
        if (err.message === "not logged") {
          logout().then(() => route("/login"));
        }
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
          <div
            id="payway"
            className="relative max-h-full px-1 overflow-y-auto no-scollbar bg-[#fcf6ff]"
            onClick={(e) => {
              const target = e.target as HTMLDivElement;

              if (target.id) setCurExpand(-1);
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
                    "w-full " +
                    (i === 0 ? "mt-4 " : " ") +
                    (arr.length - 1 === i ? " mb-4" : " mb-2.5")
                  }
                  onClick={(e) => {
                    setCurExpand(i);
                    e.stopPropagation();
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
          className="w-full mt-[5rem] py-4 text-center text-white text-lg bg-[#8d6d9f] rounded-xl"
          onClick={() => {
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
