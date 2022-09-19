import { h, FunctionalComponent } from "preact";
import Card from "../../Modal/Card";
import ModalTitle from "../../UI/ModalTitle";
import Btn from "../../UI/Btn";

interface popLogoutProps {
  onClose: () => void;
}

const PopLogout: FunctionalComponent<popLogoutProps> = ({ onClose }) => {
  return (
    <Card>
      <div>
        <ModalTitle title="登出確認" onClose={onClose} />
        <div className="my-10 text-sm text-[#9e7654]">確定要登出嗎?</div>
        <Btn title="狠心登出" cb={() => console.log("logout")} />
      </div>
    </Card>
  );
};

export default PopLogout;
