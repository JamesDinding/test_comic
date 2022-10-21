import { FunctionalComponent, h } from "preact";
import Recovery from "../../components/Profile/Services/Recovery/Recovery";
import ReturnBar from "../../components/ReturnBar";
import FooterBar from "../../components/FooterBar";

const RecoveryPage: FunctionalComponent = () => {
  return (
    <div className="grow flex flex-col">
      <ReturnBar title="寻回帐户" />
      <Recovery />
      <FooterBar />
    </div>
  );
};

export default RecoveryPage;
