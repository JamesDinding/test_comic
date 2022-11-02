import { h, FunctionalComponent, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import ReturnBar from "../../components/ReturnBar";
import UserSection from "../../components/Profile/UserSection";
import Charge from "../../components/Profile/Services/Charge/Charge";
import { useUser } from "../../context/user";

const ChargePage: FunctionalComponent = () => {
  const { getUserStatus } = useUser();

  useEffect(() => {
    getUserStatus();
  }, [getUserStatus]);

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
