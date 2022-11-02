import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect } from "preact/compat";
import { createPortal } from "preact/compat";
import { useCharge } from "../../../../context/charge";
import { useUser } from "../../../../context/user";
import BackDrop from "../../../BackDrop";
import PopPayment from "./PopPayment";
import PopConfirm from "./PopConfirm";
import Attention from "./Attention";
import IconDiscountCoins from "../../../../resources/img/icon-discount-coins.svg";
import IconDiscountVip from "../../../../resources/img/icon-discount-vip.svg";
import { getOrdersProducts } from "../../../../lib/api";
import { route } from "preact-router";

declare interface SalesItem {
  id: number;
  name: string;
  options?: {
    body: string;
    title: string;
    type: string;
  };
  cash_amount: number;
  token_amount: number;
}

const Charge = () => {
  const { selectCoins, selectPay } = useCharge();
  const { isLogIn } = useUser();
  const [isPopPayment, setIsPopPayment] = useState(false);
  const [isPopConfirm, setIsPopConfirm] = useState(false);
  const [salesList, setSalesList] = useState<SalesItem[]>([]);
  const popPaymentHandler = (sale: any) => {
    selectCoins(sale);
    setIsPopPayment(true);
  };

  useEffect(() => {
    getOrdersProducts()
      .then((response) => {
        setSalesList(response.data);
      })
      .catch((err) => {
        console.error(err.message || "failed");
      });
  }, []);

  return (
    <>
      {isPopPayment &&
        createPortal(
          <BackDrop
            onClose={setIsPopPayment}
            onReset={() => {
              selectCoins(null);
              selectPay(null);
            }}
          />,
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
          <BackDrop
            onClose={setIsPopConfirm}
            onReset={() => {
              selectCoins(null);
              selectPay(null);
            }}
          />,
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
                className="relative flex flex-col items-center justify-between py-2.5 min-h-[140px] text-[#6d5694] bg-[rgba(186,155,240,0.2)] rounded-xl"
                key={index}
              >
                {sale.options?.title && (
                  <div className="charge-discount-container">
                    <IconDiscountCoins class="h-[40px]" />
                    <div className="charge-discount-text">
                      <span>省</span>
                      <span>{sale.options?.title.split("省")[1]}</span>
                    </div>
                  </div>
                )}
                <div className="flex w-full pl-3">
                  <div>
                    <img
                      src="/assets/img/coin.png"
                      className="h-10 w-10"
                      alt=""
                    />
                  </div>
                  <div className="pl-2.5">
                    <div className="text-sm">金币</div>
                    <div className="text-lg font-semibold">
                      {sale.token_amount}
                    </div>
                    <div className="text-sm opacity-60">
                      {sale.options?.body}
                    </div>
                  </div>
                </div>

                <button
                  className="w-4/5 py-2 mt-2 rounded-xl text-white bg-[#8d6d9f]"
                  onClick={() => {
                    // if (!isLogIn) route("/login");
                    popPaymentHandler(sale);
                  }}
                >
                  &#165;&nbsp;{sale.cash_amount}
                </button>
              </div>
            );
          })}
          {/* {vipList.map((sale, index) => {
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
                    <div className="text-sm">金币</div>
                    <div className="text-lg font-semibold">3,000</div>
                    {index !== 0 && (
                      <div className="text-sm opacity-60">含赠送 3,000</div>
                    )}
                  </div>
                </div>

                <button className="w-4/5 py-2 mt-2 rounded-xl text-white bg-[#ff978d]">
                  &#165;&nbsp;30
                </button>
              </div>
            );
          })} */}
        </div>
        <Attention />
      </div>
    </>
  );
};

export default Charge;
