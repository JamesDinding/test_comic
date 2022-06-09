import { FunctionComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import PaymentBar from "./PaymentBar";

const paymentArr = [
  { img: "", title: "支付寶" },
  { img: "", title: "微信" },
];

interface Payment {
  name?: string;
}

const PopPayment = () => {
  const [curSection, setCurSection] = useState(0);
  const [data, setData] = useState<Array<Payment> | null>(null);

  useEffect(() => {
    const fake: Promise<Array<Payment>> = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{ name: "通道名稱" }]);
      }, 1500);
    });

    fake.then((data) => {
      setData(data);
    });
  });

  return (
    <div className="flex flex-col items-center pop-payment bg-white ">
      <PaymentBar
        onSetCurSection={setCurSection}
        curSection={curSection}
        paymentArr={paymentArr}
      />
      <div className="min-h-[20vh] w-full">
        <div className="text-base border-l-4 border-amber-400 mx-2 px-2 tracking-wide">
          請選擇支付通道
        </div>
        <div>fetch list and map</div>
      </div>
    </div>
  );
};

export default PopPayment;
