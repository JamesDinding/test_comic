import { FunctionalComponent, h } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import { useCharge } from "../../../../context/charge";
import PaymentBar from "./PaymentBar";
import ModalTitle from "../../../UI/ModalTitle";
import PaySelection from "./PaySelection";
import Card from "../../../Modal/Card";
import IconCross from "../../../../resources/img/icon-cross.svg";

const payAmountArr = [
  { amount: 50, title: "8000金幣" },
  { amount: 30, title: "3000金幣" },
  { amount: 100, title: "18000金幣" },
  { amount: 200, title: "40000金幣" },
  { amount: 188, title: "VIP季卡" },
  { amount: 359, title: "VIP年卡" },
];

const paymentArr = [
  { img: "", title: "支付寶" },
  { img: "", title: "微信" },
];

type Payment = {
  name: string;
  id: number;
};

interface PopPaymentkDrop {
  onClose: StateUpdater<boolean>;
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
  const [curExpand, setCurExpand] = useState(0);

  return (
    <Card>
      <div className="relative overflow-auto no-scrollbar flex flex-col items-center h-full p-5">
        <div className="modal-cross" onClick={() => onClose(false)}>
          <IconCross class="h-8" />
        </div>
        <ModalTitle title="選擇支付方案" />
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
        <div className="grow"></div>
        <button
          className="w-full py-4 text-center text-white text-lg bg-[#d19463] rounded-xl"
          onClick={() => {
            onClose(false);
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
