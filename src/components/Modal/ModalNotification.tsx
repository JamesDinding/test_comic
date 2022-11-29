import { h, FunctionalComponent } from "preact";
import Card from "./Card";
import ModalTitle from "../UI/ModalTitle";
import { useNotifyModal } from "../../context/modal";

interface ModalNotificationProps {
  title?: string;
  msg?: string;
}

const ModalNotification: FunctionalComponent<ModalNotificationProps> = ({
  title = "系统提示",
  msg = "该帐户已从其他装置登录，请确认后重新登录。",
}) => {
  const { close } = useNotifyModal();

  return (
    <Card>
      <ModalTitle title={title} onClose={close} />
      <div className="py-5 text-[#000] text-center">{msg}</div>
    </Card>
  );
};

export default ModalNotification;
