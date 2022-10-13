import { h, FunctionalComponent } from "preact";
import { route } from "preact-router";
import { useReadingModal } from "../../context/reading";
import { useUser } from "../../context/user";
import { createOrder } from "../../lib/api";
import Btn from "../UI/Btn";
import IconCross from "../../resources/img/icon-cross.svg";

const ModalBuy: FunctionalComponent = ({}) => {
  const { isPopBuy, reset } = useReadingModal();
  let layerCss = isPopBuy ? "" : "translate-y-[120%]";
  const { userStatus } = useUser();

  return (
    <div
      id="control-view"
      className={`modal-bottom bg-white overflow-y-auto no-scollbar ${layerCss}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between w-full px-5 pt-4 pb-2.5 text-[#9e7654] text-lg border-b-[1px] border-[rgba(158,118,84,.4)]">
        解锁確認
        <div onClick={reset}>
          <IconCross class="w-8 h-8 text-black cursor-pointer" />
        </div>
      </div>
      {userStatus.coins < 60 && (
        <div className="m-5">
          <Btn
            title="金幣不足，充值去"
            bgColor="bg-[#ff978d]"
            cb={() => route("/charge")}
          />
          <div className="mt-2.5 text-center text-[rgba(158,118,84,0.6)]">
            點擊按鈕後，將會前往充值服務頁面
          </div>
        </div>
      )}
      {userStatus.coins > 60 && (
        <div className="m-5">
          <Btn
            title="繼續閱讀"
            bgColor="bg-[#d19463]"
            cb={async () => {
              // call api
              const data = await createOrder("名稱最長五-1", 60);
              console.log(data);
              // route("/reading/1235");
            }}
          />
          <div className="mt-2.5 text-center text-[rgba(158,118,84,0.6)]">
            繼續閱讀將消耗 <span className="text-[#ff978d]">60</span> 金幣
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalBuy;
