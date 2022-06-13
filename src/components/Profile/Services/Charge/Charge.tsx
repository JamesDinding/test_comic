import { FunctionalComponent, h, Fragment } from "preact";
import { useState } from "preact/compat";
import { createPortal } from "preact/compat";
import BackDrop from "../../../BackDrop";
import PopPayment from "./PopPayment";
import IconCoins from "../../../../resources/img/icon-coins.svg";
import IconVip from "../../../../resources/img/icon-vip.svg";
import IconDiamond from "../../../../resources/img/charge-diamond.svg";

const salesList = [
  { title: `50元`, price: `5000+3000`, bonus: "多送30元", explain: "金幣" },
  { title: `30元`, price: `3000`, bonus: "多送30元", explain: "金幣" },
  {
    title: `100元`,
    price: `10000+8000`,
    bonus: "多送80元",
    explain: "金幣",
    recommend: true,
    hot: true,
  },
  {
    title: `200元`,
    price: `20000+2000`,
    bonus: "多送200元",
    explain: "金幣",
  },
  {
    title: `VIP季卡`,
    price: `188`,
    bonus: "",
    explain: "90天 免費看",
    hot: true,
  },
  {
    title: `VIP年卡`,
    price: `359`,
    bonus: "",
    explain: "365天 免費看",
    hot: true,
  },
];

const Charge = () => {
  const [isPop, setIsPop] = useState(false);
  const clickHandler = () => {
    setIsPop(true);
  };

  return (
    <>
      {isPop &&
        createPortal(
          <BackDrop onClose={setIsPop} />,
          document.getElementById("back-drop")!
        )}
      {isPop &&
        createPortal(
          <PopPayment onClose={setIsPop} />,
          document.getElementById("pop-window")!
        )}
      <div className="flex flex-col justify-center items-center w-full bg-white rounded-2xl mt-4 px-4">
        <div className="flex flex-col items-center pt-4 mb-2">
          <div className="flex items-center">
            <div>
              <IconCoins class="h-4 pr-1" />
            </div>
            充值金幣
            <div>
              <IconCoins class="h-4 pl-1" />
            </div>
          </div>
          <span className="text-xs flex text-[#a8a8a8]">
            歡迎使用
            <img className="w-[20px]" src="/img/payment/pay1.png" alt="" />
            支付寶
            <img className="w-[20px]" src="/img/payment/pay2.png" alt="" />
            微信
          </span>
        </div>
        <div className="flex flex-wrap justify-between">
          {salesList.map((sale, index) => {
            return (
              <div
                className="rounded-2xl min-h-[90px] w-[47%] p-2.5 border-[1px] charge-item my-2 charge-item"
                onClick={clickHandler}
                key={index}
              >
                {sale.recommend && <div className="charge-recommend">推薦</div>}
                <div className="absolute bottom-1 right-2 opacity-50">
                  {sale.title.startsWith("VIP") ? (
                    <IconVip class="h-5" />
                  ) : (
                    <IconDiamond class="h-5" />
                  )}
                </div>
                <div>
                  {sale.title}
                  {sale.hot && <span className="charge-hot">熱銷</span>}
                </div>
                <div className="text-[#ff230e]">
                  {sale.price}
                  <span className="text-gray-500 text-sm">{sale.explain}</span>
                </div>
                <div className="text-[#a8a8a8] text-xs">{sale.bonus}</div>
              </div>
            );
          })}
        </div>
        <div className="charge-vip-hint">VIP用户可无限阅读所有作品！</div>
        <span className="text-xs text-[#a8a8a8]">
          有任何問題請聯繫
          <div className="text-center">
            <a>在線克服</a>
          </div>
        </span>
      </div>
    </>
  );
};

export default Charge;
