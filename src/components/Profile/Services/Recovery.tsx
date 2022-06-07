import { FunctionalComponent, h } from "preact";

const Recovery = () => {
  return (
    <div className="grow p-4 bg-white text-sm text-gray-600 w-full test">
      <div className="recovery-text">1.&nbsp;查看您支付/寶微信訂單紀錄</div>
      <div className="recovery-text">
        2.&nbsp;複製<span className="text-rose-300">商戶單號(NS******)</span>
      </div>
      <div className="recovery-text">3.&nbsp;黏貼至下方輸入匡</div>
      <div className="recovery-text">4.&nbsp;點擊尋回張戶</div>
      <div className="my-2 mb-4">
        <div className="text-base font-light">您的帳戶為:</div>
        <input
          className={`w-full rounded-3xl h-[2.5rem] indent-12 border-[1px] bg-register-icon bg-no-repeat bg-[length:25px_25px] bg-[center_left_0.9rem] my-2`}
          type="text"
          placeholder="請輸入商戶單號"
        />
        <button className="w-full bg-[#ff978d] rounded-2xl h-[2.5rem] my-2 text-base text-white font-extralight tracking-wider">
          尋回帳戶
        </button>
      </div>
      <div className="recovery-text">
        5.回到 <span className="text-rose-300">我的</span> 點擊{" "}
        <span className="text-rose-300">切換帳戶</span> 即可使用你尋回的帳戶登入
      </div>
      <div className="tracking-widest font-light mt-4">
        ＊建議您立即 <span className="text-rose-300">註冊</span>
        ，避免帳戶信息再次遺失
      </div>
    </div>
  );
};

export default Recovery;
