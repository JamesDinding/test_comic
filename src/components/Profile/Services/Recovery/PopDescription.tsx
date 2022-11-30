import { h, FunctionalComponent, Fragment as F } from "preact";
import Card from "../../../Modal/Card";
import ModalTitle from "../../../UI/ModalTitle";
import Btn from "../../../UI/Btn";
import { route } from "preact-router";
import { useRouter } from "../../../../context/router";

interface PopDescriptionProps {
  onClose: () => void;
}

const PopDescription: FunctionalComponent<PopDescriptionProps> = ({
  onClose,
}) => {
  const { customRouter } = useRouter();

  return (
    <Card heightShrink={true}>
      <div className="relative overflow-y-auto no-scrollbar flex flex-col items-center h-full p-5">
        <ModalTitle title="寻回帐户说明" onClose={onClose} />
        <div className="w-full text-sm text-[#ff978d] mt-5">
          若您的帐户遗失了，请别担心，请您提供下列完整信息，将由专人为您解决。
        </div>
        <ul className="w-full text-sm text-[#666666] mt-5">
          <li>
            <span>1. 请提供</span>&nbsp;
            <span className="font-semibold">充值过的订单截图。</span>
          </li>
          <li>
            <span>2. 请复制</span>&nbsp;
            <span className="font-semibold">当前游客ID。</span>
          </li>
          <li>
            <span>3. 请提供一本您</span>&nbsp;
            <span className="font-semibold">消费过的书籍名称。</span>
          </li>
        </ul>
        <p className="w-full text-sm text-[#666666] mt-5">
          以上信息准备完成后，请联系客服，客服人员将会协助您取得一组
          <strong>对应号码</strong>，请按照步骤回填资讯，即可寻回帐户。
        </p>
        <div className="w-full text-sm text-[#ff978d] mt-5 mb-10">
          提醒您：绑定会员资料可避免帐户遗失！
        </div>
        <Btn
          title="联系客服"
          bgColor="bg-[#a186af]"
          cb={() => {
            customRouter.push("/service");
            route("/service");
          }}
        />
      </div>
    </Card>
  );
};

export default PopDescription;
