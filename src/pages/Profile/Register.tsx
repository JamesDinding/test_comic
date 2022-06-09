import { h, FunctionalComponent, Fragment } from "preact";
import ReturnBar from "../../components/ReturnBar";
import Register from "../../components/Profile/Services/Register";

const RegisterPage: FunctionalComponent = () => {
  return (
    <>
      <div class="grow bg-white">
        <ReturnBar title="註冊" />
        <Register />
      </div>
    </>
  );
};

export default RegisterPage;
