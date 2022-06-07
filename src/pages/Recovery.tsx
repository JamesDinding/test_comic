import { FunctionalComponent, h } from "preact";
import Recovery from "../components/Profile/Services/Recovery";
import ReturnBar from "../components/ReturnBar";

const RecoveryPage: FunctionalComponent = () => {
  return (
    <div className="grow">
      <ReturnBar title="尋回帳戶" />
      <Recovery />
    </div>
  );
};

export default RecoveryPage;
