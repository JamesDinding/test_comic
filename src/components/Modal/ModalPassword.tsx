import { h, FunctionalComponent } from "preact";
import CardBottom from "./CardBottom";
import ModalTitle from "../UI/ModalTitle";
import Btn from "../UI/Btn";

interface ModalPasswordProps {
  onClose: () => void;
}

const ModalPassword: FunctionalComponent<ModalPasswordProps> = ({
  onClose,
}) => {
  return (
    <CardBottom>
      <ModalTitle title="温馨提示" onClose={onClose} />
      <div className="p-5 text-[#666666] text-lg">
        <div className="text-center">恭喜您，您的密码已经修改成功。</div>

        <img
          src="/assets/img/check.png"
          className="w-[100px] mx-auto my-8"
          alt=""
        />
        <Btn title="点击关闭" cb={() => onClose()} />
      </div>
    </CardBottom>
  );
};

export default ModalPassword;
