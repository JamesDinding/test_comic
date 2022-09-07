import { FunctionalComponent, h } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import PaymentBar from "./PaymentBar";
import PaySelection from "./PaySelection";
import Card from "../../../Modal/Card";
import IconCross from "../../../../resources/img/icon-cross.svg";

// temp
const temp_pay = [
  {
    pay: "支付寶",
    p_id: "12345",
    p_way: ["线路名称 1", "线路名称 2", "线路名称 3", "线路名称 4"],
  },
  {
    pay: "微信",
    p_id: "23456",
    p_way: ["线路名称 1", "线路名称 2", "线路名称 3", "线路名称 4"],
  },
  {
    pay: "雲散服",
    p_id: "34567",
    p_way: ["线路名称 1", "线路名称 2", "线路名称 3", "线路名称 4"],
  },
  {
    pay: "USDT",
    p_id: "45678",
    p_way: [
      "线路名称 1",
      "线路名称 2",
      "线路名称 3",
      "线路名称 4",
      "线路名称 5",
      "线路名称 6",
    ],
  },
];

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
}
interface PayListProps {
  payList: Array<Payment>;
}

const PopPayment: FunctionalComponent<PopPaymentkDrop> = ({ onClose }) => {
  const [curExpand, setCurExpand] = useState(0);

  return (
    <Card>
      <div className="relative flex flex-col items-center h-full p-5">
        <div
          className="absolute cursor-pointer right-4 top-4"
          onClick={() => onClose(false)}
        >
          <IconCross class="h-8" />
        </div>
        <div className="pop-payment-title">選擇支付方案</div>
        {temp_pay.map((pay, i) => {
          const isNowExpand = curExpand === i;
          return (
            <div
              className="w-full"
              onClick={(e) => {
                // if (curExpand === i) {
                //   setCurExpand(-1);
                //   return;
                // }

                setCurExpand(i);
              }}
            >
              <PaySelection payInfo={pay} isExpand={isNowExpand} />
            </div>
          );
        })}
        <div className="grow"></div>
        <button className="w-full py-4 text-center text-white text-lg bg-[#d19463] rounded-xl">
          下一步
        </button>
      </div>
    </Card>
  );
};

export default PopPayment;
