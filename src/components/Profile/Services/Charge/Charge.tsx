import { FunctionalComponent, h, Fragment } from "preact";
import { useState } from "preact/compat";
import { createPortal } from "preact/compat";
import { useCharge } from "../../../../context/charge";
import BackDrop from "../../../BackDrop";
import PopPayment from "./PopPayment";
import PopConfirm from "./PopConfirm";
import Attention from "./Attention";
import IconDiscountCoins from "../../../../resources/img/icon-discount-coins.svg";
import IconDiscountVip from "../../../../resources/img/icon-discount-vip.svg";

interface PorductItem {
  type: string;
  title: string;
  bonus: string;
  cost: string;
  mark: string;
}

const vipList = [
  {
    type: "VIP无限看",
    title: "90 天",
    bonus: "任你挑选",
    cost: "188",
    mark: "推薦",
  },
  {
    type: "VIP无限看",
    title: "180 天",
    bonus: "任你挑选",
    cost: "369",
    mark: "推薦",
  },
];
const salesList = [
  {
    type: "金幣",
    title: "3,000",
    bonus: "含贈送 3,000",
    cost: "30",
    mark: "省30",
  },
  {
    type: "金幣",
    title: "3,000",
    bonus: "含贈送 3,000",
    cost: "30",
    mark: "省30",
  },
  {
    type: "金幣",
    title: "3,000",
    bonus: "含贈送 3,000",
    cost: "30",
    mark: "省30",
  },
  {
    type: "金幣",
    title: "3,000",
    bonus: "含贈送 3,000",
    cost: "30",
    mark: "省30",
  },
];

const Charge = () => {
  const { selectCoins } = useCharge();
  const [isPopPayment, setIsPopPayment] = useState(false);
  const [isPopConfirm, setIsPopConfirm] = useState(false);
  const popPaymentHandler = (sale: { title: string; cost: string }) => {
    console.log(sale);
    selectCoins(sale.title, parseInt(sale.cost, 10));
    setIsPopPayment(true);
  };

  return (
    <>
      {isPopPayment &&
        createPortal(
          <BackDrop onClose={setIsPopPayment} />,
          document.getElementById("back-drop")!
        )}
      {isPopPayment &&
        createPortal(
          <PopPayment
            onClose={() => setIsPopPayment(false)}
            onNextConfirm={() => setIsPopConfirm(true)}
          />,
          document.getElementById("pop-window")!
        )}
      {isPopConfirm &&
        createPortal(
          <BackDrop onClose={setIsPopConfirm} />,
          document.getElementById("back-drop")!
        )}
      {isPopConfirm &&
        createPortal(
          <PopConfirm onClose={() => setIsPopConfirm(false)} />,
          document.getElementById("pop-window")!
        )}
      <div className="flex flex-col justify-center items-center w-full bg-white mt-4 px-5 pb-10">
        <div className="modal-title mb-5">选择充值金额</div>
        <div className="w-full grid grid-cols-2 gap-4 mb-5">
          {salesList.map((sale, index) => {
            return (
              <div
                className="relative flex flex-col items-center justify-between py-2.5 min-h-[140px] text-[#9e7654] bg-[rgba(248,200,137,0.2)] rounded-xl"
                onClick={popPaymentHandler.bind(this, {
                  title: sale.title,
                  cost: sale.cost,
                })}
                key={index}
              >
                <div className="charge-discount-container">
                  <IconDiscountCoins class="h-[40px]" />
                  <div className="charge-discount-text">
                    <span>省</span>
                    <span>80</span>
                  </div>
                </div>
                <div className="flex w-full pl-3">
                  <div>
                    <img
                      src="/assets/img/coin.png"
                      className="h-10 w-10"
                      alt=""
                    />
                  </div>
                  <div className="pl-2.5">
                    <div className="text-sm">金幣</div>
                    <div className="text-lg font-semibold">3,000</div>
                    {index !== 0 && (
                      <div className="text-sm opacity-60">含贈送 3,000</div>
                    )}
                  </div>
                </div>

                <button className="w-4/5 py-2 mt-2 rounded-xl text-white bg-[#d19463]">
                  &#165;&nbsp;30
                </button>
              </div>
            );
          })}
          {vipList.map((sale, index) => {
            return (
              <div
                className="relative flex flex-col items-center justify-between py-2.5 min-h-[140px] text-[#9e7654] bg-[rgba(255,188,188,0.2)] rounded-xl"
                onClick={popPaymentHandler.bind(this, sale)}
                key={index}
              >
                <div className="charge-discount-container">
                  <IconDiscountVip class="w-[27px]" />
                </div>
                <div className="flex w-full pl-3">
                  <div>
                    <img
                      src="/assets/img/coin.png"
                      className="h-10 w-10"
                      alt=""
                    />
                  </div>
                  <div className="pl-2.5">
                    <div className="text-sm">金幣</div>
                    <div className="text-lg font-semibold">3,000</div>
                    {index !== 0 && (
                      <div className="text-sm opacity-60">含贈送 3,000</div>
                    )}
                  </div>
                </div>

                <button className="w-4/5 py-2 mt-2 rounded-xl text-white bg-[#ff978d]">
                  &#165;&nbsp;30
                </button>
              </div>
            );
          })}
        </div>
        <Attention />
      </div>
    </>
  );
};

export default Charge;
