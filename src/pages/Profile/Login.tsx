import { h, FunctionalComponent, Fragment } from "preact";
import ReturnBar from "../../components/ReturnBar";
import Login from "../../components/Profile/Services/Login";

const LoginPage: FunctionalComponent = () => {
  return (
    <>
      <div class="grow flex flex-col min-h-screen bg-white">
        <ReturnBar title="登錄" />
        <Login />
      </div>
    </>
  );
};

export default LoginPage;
