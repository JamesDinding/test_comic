import { h, FunctionalComponent } from "preact";
import Card from "./Card";
import ModalTitle from "../UI/ModalTitle";
import { useNotifyModal } from "../../context/modal";
import { StateUpdater } from "preact/hooks";

interface ModalNotificationProps {
  onClose: StateUpdater<boolean>;
  title?: string;
  msg?: string;
}

const ModalNotification: FunctionalComponent<ModalNotificationProps> = ({
  title = "系统提示",
  msg = "该帐户已从其他装置登录，请确认后重新登录。",
  onClose,
}) => {
  return (
    <Card heightShrink={true}>
      <ModalTitle title={title} onClose={() => onClose(false)} />
      <div className="px-5 py-10 text-[#000] text-center">{msg}</div>
    </Card>
  );
};

export default ModalNotification;
