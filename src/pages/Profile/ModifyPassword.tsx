import { h, FunctionalComponent, Fragment } from "preact";
import ReturnBar from "../../components/ReturnBar";
import ModifyPassword from "../../components/Profile/Services/ModifyPassword";

const ModifyPasswordPage: FunctionalComponent = () => {
  return (
    <>
      <div class="grow bg-white">
        <ReturnBar title="修改密碼" />
        <ModifyPassword />
      </div>
    </>
  );
};

export default ModifyPasswordPage;
