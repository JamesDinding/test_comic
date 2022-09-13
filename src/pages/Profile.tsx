import { h, FunctionalComponent, Fragment } from "preact";
import UserSection from "../components/Profile/UserSection";
import ServiceList from "../components/Profile/ServiceList";
import ReturnBar from "../components/ReturnBar";
import FooterBar from "../components/FooterBar";

const ProfilePage: FunctionalComponent = () => {
  return (
    <>
      <ReturnBar title="會員中心" />
      <div class="grow bg-[#efefef] px-5">
        <UserSection />
        <div className="my-4"></div>
        <ServiceList />
      </div>
      <FooterBar />
    </>
  );
};

export default ProfilePage;
