import { h, FunctionalComponent } from "preact";
import Card from "./Card";
import ModalTitle from "../UI/ModalTitle";
import { useNotifyModal } from "../../context/modal";

const ModalNotification: FunctionalComponent = () => {
  const { close } = useNotifyModal();

  return (
    <Card>
      <ModalTitle title="系统提示" onClose={close} />
      <div className="py-5 text-center">
        该帐户已从其他装置登录，请确认后重新登录。
      </div>
    </Card>
  );
};

export default ModalNotification;
