import { h, FunctionalComponent } from "preact";
import { StateUpdater } from "preact/hooks";
import CardBottom from "./CardBottom";
import ModalTitle from "../UI/ModalTitle";
import Btn from "../UI/Btn";
import IconSafari from "../../resources/img/icon-safari.svg";

interface ModalSafariProps {
  onClose: () => void;
}

const ModalSafari: FunctionalComponent<ModalSafariProps> = ({ onClose }) => {
  return (
    <CardBottom>
      <ModalTitle title="温馨提示" onClose={onClose} />
      <div className="p-5 text-[#000] text-lg">
        <div className="">
          您目前使用的浏览器非苹果官方Safari，无法安装本站所提供的iOS轻量版App
        </div>
        <div>请使用官方Safari浏览本站点再点击安装App以开始安装</div>
        <IconSafari class="w-1/3 mx-auto my-4" />
        <Btn title="我已了解" cb={() => onClose()} />
      </div>
    </CardBottom>
  );
};

export default ModalSafari;
