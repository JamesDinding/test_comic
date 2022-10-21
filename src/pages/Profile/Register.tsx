import { h, FunctionalComponent, Fragment } from "preact";
import ReturnBar from "../../components/ReturnBar";
import Register from "../../components/Profile/Services/Register";

const RegisterPage: FunctionalComponent = () => {
  return (
    <>
      <div class="grow flex flex-col min-h-screen bg-white">
        <ReturnBar title="注册" hasShadow={true} />
        <Register />
      </div>
    </>
  );
};

export default RegisterPage;
