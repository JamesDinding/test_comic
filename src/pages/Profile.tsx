import { h, FunctionalComponent, Fragment } from "preact";
import User from "../components/Profile/User";
import ServiceList from "../components/Profile/ServiceList";
import FooterBar from "../components/FooterBar";

const ProfilePage: FunctionalComponent = () => {
  return (
    <>
      <div class="grow bg-[#efefef]">
        <User />
        <div className="my-4"></div>
        <ServiceList />
      </div>
      <FooterBar />
    </>
  );
};

export default ProfilePage;
