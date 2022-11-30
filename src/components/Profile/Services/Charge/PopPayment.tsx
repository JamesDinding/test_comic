import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";
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
  const [payments, setPayments] = useState<any>([]);
  const [orderedWay, setOrderedWay] = useState<string[]>([]);

  // counter for showing id
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getOrdersProductsId(userSelect.id.toString())
      .then((response) => {
        const { data, ordering } = response;
        setOrderedWay(ordering);
        setPayments(data);
      })
      .catch((err) => {
        console.error(err.message || "failed");
      });
  }, []);

  return (
    <Card heightDynamic={true}>
      <div className={"expandPayment overflow-hidden"}>
        <div className={"relative flex flex-col items-center h-full p-5 "}>
          <div
            className="w-full"
            onClick={() => setCounter((prev) => prev + 1)}
          >
            <ModalTitle
              title="选择支付方案"
              onClose={() => {
                selectPay(null);
                selectCoins(null);
                onClose();
              }}
            />
          </div>
          <div className="w-full max-h-[350px] overflow-y-auto no-scollbar bg-[#fcf6ff]">
            <div id="payway" className="relative overflow-hidden px-1 py-2.5">
              <div className="payment-shadow"></div>
              {orderedWay?.map((way: any, i: any, arr: any) => {
                return (
                  <div
                    key={i}
                    className={
                      "w-full" + (arr.length - 1 === i ? " " : " mb-2.5")
                    }
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PaySelection
                      payInfo={payments[way]}
                      isExpand={true}
                      dev_showId={counter > 4}
                      onNext={onNextConfirm}
                      onClose={onClose}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PopPayment;
