import { FunctionalComponent, h } from "preact";

const salesList = [
  { price: `50元`, coins: `5000+3000`, bonus: "多送30元", explain: "金幣" },
  { price: `30元`, coins: `3000`, bonus: "多送30元", explain: "金幣" },
  { price: `100元`, coins: `10000+8000`, bonus: "多送80元", explain: "金幣" },
  {
    price: `200元`,
    coins: `20000+2000`,
    bonus: "多送200元",
    explain: "金幣",
  },
  { price: `VIP季卡`, coins: `188`, bonus: "", explain: "90天 免費看" },
  { price: `VIP年卡`, coins: `359`, bonus: "", explain: "365天 免費看" },
];

const Charge = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-white rounded-2xl mt-4">
      <div className="flex flex-col items-center pt-4">
        <span>i 充值金幣 i</span>
        <span className="text-xs flex text-[#a8a8a8]">
          歡迎使用
          <img className="w-[20px]" src="/img/payment/pay1.png" alt="" />
          支付寶
          <img className="w-[20px]" src="/img/payment/pay2.png" alt="" />
          微信
        </span>
      </div>
      <div className="flex flex-wrap justify-center">
        {salesList.map((sale, index) => {
          return (
            <div
              className="rounded-2xl w-[175px] h-[100px]  p-2.5 border-[1px]"
              key={index}
            >
              <div>{sale.price}</div>
              <div>
                {sale.coins}
                <span className="text-gray-500 text-sm">{sale.explain}</span>
              </div>
              <div className="text-[#a8a8a8] text-xs">{sale.bonus}</div>
            </div>
          );
        })}
        <span className="text-xs text-[#a8a8a8]">
          有任何問題請聯繫
          <div className="text-center">
            <a>在線克服</a>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Charge;
