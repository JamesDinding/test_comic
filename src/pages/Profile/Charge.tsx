import { h, FunctionalComponent, Fragment } from "preact";
import ReturnBar from "../../components/ReturnBar";
import User from "../../components/Profile/User";
import Charge from "../../components/Profile/Services/Charge";

const ChargePage: FunctionalComponent = () => {
  return (
    <>
      <div class="grow bg-[#efefef]">
        <ReturnBar title="立即充值" />
        <User />
        <Charge />
      </div>
    </>
  );
};

export default ChargePage;
