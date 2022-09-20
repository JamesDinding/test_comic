import { FunctionalComponent, h } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import { useCharge } from "../../../../context/charge";
import ModalTitle from "../../../UI/ModalTitle";
import PaySelection from "./PaySelection";
import Card from "../../../Modal/Card";
import IconCross from "../../../../resources/img/icon-cross.svg";

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
  const { selectPay, payments, userSelect } = useCharge();
  const [curExpand, setCurExpand] = useState(-1);

  return (
    <Card>
      <div className="relative overflow-auto no-scrollbar flex flex-col items-center h-full p-5">
        <div className="modal-cross" onClick={() => onClose()}>
          <IconCross class="h-8" />
        </div>
        <ModalTitle title="選擇支付方案" onClose={onClose} />
        <div className="relative w-full h-2/3">
          <div className="payment-shadow"></div>
          <div className="h-full px-1 overflow-y-auto no-scollbar bg-[#fffbf6]">
            {payments?.map((payment, i) => {
              const isNowExpand = curExpand === i;
              return (
                <div
                  className="w-full mt-2.5"
                  onClick={(e) => {
                    // if (curExpand === i) {
                    //   setCurExpand(-1);
                    //   return;
                    // }

                    setCurExpand(i);
                  }}
                >
                  <PaySelection payInfo={payment} isExpand={isNowExpand} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="grow"></div>
        <button
          className="w-full py-4 text-center text-white text-lg bg-[#d19463] rounded-xl"
          onClick={() => {
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
