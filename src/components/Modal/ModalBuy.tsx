import { h, FunctionalComponent } from "preact";
import { useRouter } from "../../context/router";
import { route } from "preact-router";
import { useReadingModal } from "../../context/reading";
import { useUser } from "../../context/user";
import { createOrder, postOrdersPurchase } from "../../lib/api";
import Btn from "../UI/Btn";
import IconCross from "../../resources/img/icon-cross.svg";
import { StateUpdater } from "preact/hooks";
import CardBottom from "./CardBottom";

interface ModalBuyProps {
  setChapterList?: StateUpdater<any>;
  curComic?: number;
  cb?: (arg: any) => any;
}

const ModalBuy: FunctionalComponent<ModalBuyProps> = ({
  cb,
  curComic,
  setChapterList,
}) => {
  const { customRouter } = useRouter();
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
            cb={() => {
              customRouter.push("/charge");
              route("/charge");
            }}
          />
          <div className="mt-2.5 text-center text-[#6d569466]">
            点击按钮后，将会前往充值服务页面
          </div>
        </div>
      )}
      {userStatus.coins >= (stuffInfo?.price || 60) && (
        <div className="m-5">
          <Btn
            title="继续阅读"
            bgColor="bg-[#8d6d9f]"
            cb={() => {
              postOrdersPurchase(stuffInfo?.id)
                .then((response) => {
                  cb && cb(stuffInfo?.position);

                  // update chapterList status
                  setChapterList &&
                    setChapterList((prev: any) => {
                      const temp = [...prev];
                      temp.forEach((t: any) => {
                        if (t?.id === stuffInfo?.id) {
                          t.status = true;
                        }
                      });

                      return temp;
                    });
                  updateCoins(stuffInfo?.price || 60);
                  reset();

                  customRouter.push(
                    `/read/${stuffInfo?.bookId}/chapter/${stuffInfo?.position}`,
                    true
                  );
                  route(
                    `/read/${stuffInfo?.bookId}/chapter/${stuffInfo?.position}`,
                    true
                  );
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          />
          <div className="mt-2.5 text-center text-[#6d569466]">
            现在有
            <span className="text-[#eb6f6f]">
              &nbsp;{userStatus.coins}&nbsp;
            </span>
            金币 ，继续阅读将消耗{" "}
            <span className="text-[#eb6f6f]">{stuffInfo?.price || 60}</span>{" "}
            金币
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalBuy;
