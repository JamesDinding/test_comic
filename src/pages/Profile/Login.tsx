import { h, FunctionalComponent, Fragment } from "preact";
import ReturnBar from "../../components/ReturnBar";
import Login from "../../components/Profile/Services/Login";

const LoginPage: FunctionalComponent = () => {
  return (
    <>
      <div class="grow bg-white">
        <ReturnBar title="登錄" />
        <Login />
      </div>
    </>
  );
};

export default LoginPage;
