import { FunctionComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";
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

interface PayListProps {
  payList: Array<Payment>;
}

const PopPayment = () => {
  // section 支付寶/微信
  const [curSection, setCurSection] = useState(0);
  // 通道１２３的資料
  const [data, setData] = useState<Array<Payment> | null>(null);
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

    fake.then((data) => {
      setData(data);
    });
  }, [curSection]);

  return (
    <div className="flex flex-col items-center pop-payment bg-[#efefef]">
      <PaymentBar
        onSetCurSection={setCurSection}
        curSection={curSection}
        paymentArr={paymentArr}
      />
      <div className="min-h-[20vh] w-full">
        <div className="bg-white pt-2 mb-2">
          <div className="text-base border-l-4 border-amber-400 mx-4 px-2 tracking-wider">
            請選擇支付通道
          </div>
          <div className="grid grid-cols-3 min-h-[5vh] my-4 mx-2">
            {data?.map((pay) => {
              const paymentActive =
                pay.id === curPayment
                  ? "bg-[#fdddcb] border-[#f98d83] text-[#f98d83] before:content-[''] before:right-0 before:bottom-0 before:w-4 before:h-4"
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
        </div>
        <div className="bg-white py-2">
          <div className="text-base border-l-4 border-amber-400 mx-4 px-2 tracking-wider">
            請選擇充值金額
          </div>
          <div className="grid grid-cols-3 min-h-[5vh] my-4 mx-2">
            {payAmountArr.map((pay, i) => {
              return (
                <div
                  className={`cursor-pointer text-center text-sm text-[#f98d83] tracking-wide my-1 mx-2 py-2 px-4 border-[1px] border-solid border-[#f98d83] rounded-xl`}
                  onClick={() => {
                    console.log(
                      "現在的廠商：",
                      curSection,
                      "現在的通道：",
                      curPayment,
                      "金額：",
                      pay.amount
                    );
                  }}
                >
                  <div className="font-medium">{pay.amount}元</div>
                  <div className="text-[.6rem] whitespace-nowrap">
                    {pay.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopPayment;
