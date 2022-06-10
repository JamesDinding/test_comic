import { FunctionalComponent, FunctionComponent, h } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import PaymentBar from "./PaymentBar";

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
  // section 支付寶/微信
  const [curSection, setCurSection] = useState(0);
  // 通道１２３的資料
  const [data, setData] = useState<Array<Payment> | null>(null);
  const [isPending, setIsPending] = useState(false);
  // 現在通道１．２．３
  const [curPayment, setCurPayment] = useState<number | null>(null);
  // 金額
  const [chargeAmount, setChargeAmount] = useState(0);

  useEffect(() => {
    const fake: Promise<Array<Payment>> = new Promise((resolve, reject) => {
      setTimeout(() => {
        curSection === 0 &&
          resolve([
            { name: "通道1", id: 12345 },
            { name: "通道2", id: 12346 },
            { name: "通道3", id: 12347 },
            { name: "通道8", id: 12348 },
          ]);
        curSection === 1 &&
          resolve([
            { name: "通道5", id: 12350 },
            { name: "通道6", id: 12349 },
            { name: "通道7", id: 12351 },
          ]);
      }, 1500);
    });

    setIsPending(true);
    fake.then((data) => {
      setData(data);
      setIsPending(false);
    });
  }, [curSection]);

  return (
    <div className="relative flex flex-col items-center pop-payment bg-white py-2">
      <div
        className="absolute cursor-pointer right-1 top-0 opacity-50"
        onClick={() => onClose(false)}
      >
        X
      </div>
      <PaymentBar
        onSetCurSection={setCurSection}
        curSection={curSection}
        paymentArr={paymentArr}
      />
      <div className="min-h-[20vh] w-full">
        <div className="bg-white pt-2">
          <div className="text-base border-l-4 border-amber-400 mx-4 px-2 tracking-wider">
            請選擇支付通道
          </div>
          {!isPending && (
            <div className="grid grid-cols-1 min-h-[5vh] my-4 mx-2">
              {data?.map((pay) => {
                const paymentActive =
                  pay.id === curPayment
                    ? "bg-[#fdddcb] border-[#f98d83] text-[#f98d83] pop-payment-active-decoration"
                    : "bg-white border-[#D9D9D9]";

                return (
                  <div
                    id={pay.id.toString()}
                    className={`cursor-pointer relative text-center text-sm tracking-wide my-1 mx-2 py-2 px-4 border-[1px] border-solid rounded ${paymentActive}`}
                    onClick={() => setCurPayment(pay.id)}
                  >
                    {pay.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopPayment;
