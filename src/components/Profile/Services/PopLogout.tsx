import { h, FunctionalComponent } from "preact";
import Card from "../../Modal/Card";
import ModalTitle from "../../UI/ModalTitle";
import Btn from "../../UI/Btn";
import { useUser } from "../../../context/user";

interface popLogoutProps {
  onClose: () => void;
}

const PopLogout: FunctionalComponent<popLogoutProps> = ({ onClose }) => {
  const { logout } = useUser();

  return (
    <Card heightShrink={true}>
      <div>
        <ModalTitle title="登出确认" onClose={onClose} />
        <div className="m-5">
          <div className="my-10 text-sm text-center text-[#666666]">
            确定要登出吗?
          </div>
          <Btn
            title="狠心登出"
            bgColor="bg-[#eb6f6f]"
            cb={() => {
              logout();
              onClose();
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default PopLogout;
