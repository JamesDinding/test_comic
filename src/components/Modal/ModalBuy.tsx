import { h, FunctionalComponent } from "preact";
import { route } from "preact-router";
import { useReadingModal } from "../../context/reading";
import { useUser } from "../../context/user";
import { createOrder, postOrdersPurchase } from "../../lib/api";
import Btn from "../UI/Btn";
import IconCross from "../../resources/img/icon-cross.svg";
import { StateUpdater } from "preact/hooks";
import CardBottom from "./CardBottom";

interface ModalBuyProps {
  cb?: (arg: any) => any;
}

const ModalBuy: FunctionalComponent<ModalBuyProps> = ({ cb }) => {
  const { isPopBuy, stuffInfo, reset } = useReadingModal();
  let layerCss = isPopBuy ? "" : "translate-y-[120%]";
  const { userStatus, updateCoins } = useUser();

  return (
    <div
      id="control-view"
      className={`modal-bottom bg-white overflow-y-auto no-scollbar ${layerCss}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between w-full px-5 pt-4 pb-2.5 text-[#8d6d9f] text-lg border-b-[1px] border-[#8d6d9f66]">
        解锁确认
        <div onClick={reset}>
          <IconCross class="w-8 h-8 text-black cursor-pointer" />
        </div>
      </div>
      {userStatus.coins < (stuffInfo?.price || 60) && (
        <div className="m-5">
          <Btn
            title="金币不足，充值去"
            bgColor="bg-[#eb6f6f]"
            cb={() => route("/charge")}
          />
          <div className="mt-2.5 text-center text-[#6d569466]">
            点击按钮后，将会前往充值服务页面
          </div>
        </div>
      )}
      {userStatus.coins > (stuffInfo?.price || 60) && (
        <div className="m-5">
          <Btn
            title="继续阅读"
            bgColor="bg-[#8d6d9f]"
            cb={() => {
              console.log(stuffInfo);
              postOrdersPurchase(stuffInfo?.id)
                .then((response) => {
                  console.log(response);
                  cb && cb(stuffInfo?.position);

                  updateCoins(stuffInfo?.price || 60);
                  reset();

                  route(
                    `/read/${stuffInfo?.bookId}/chapter/${stuffInfo?.position}`,
                    true
                  );
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
          <div className="mt-2.5 text-center text-[#6d569466]">
            继续阅读将消耗{" "}
            <span className="text-[#eb6f6f]">{stuffInfo?.price || 60}</span>{" "}
            金币
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalBuy;
