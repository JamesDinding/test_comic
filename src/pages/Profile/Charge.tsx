import { h, FunctionalComponent, Fragment } from "preact";
import ReturnBar from "../../components/ReturnBar";
// import User from "../../components/Profile/User";
import UserSection from "../../components/Profile/UserSection";
import Charge from "../../components/Profile/Services/Charge/Charge";

const ChargePage: FunctionalComponent = () => {
  return (
    <>
      <div class="grow bg-white overflow-y-auto no-scollbar">
        <ReturnBar title="立即充值" />
        <div className="w-full px-5 mb-[-1.25rem]">
          <UserSection />
        </div>
        <Charge />
      </div>
    </>
  );
};

export default ChargePage;
