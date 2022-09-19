import { h, FunctionalComponent, Fragment } from "preact";
import { useState } from "preact/hooks";
import UserSection from "../components/Profile/UserSection";
import ServiceList from "../components/Profile/ServiceList";
import ReturnBar from "../components/ReturnBar";
import FooterBar from "../components/FooterBar";

const ProfilePage: FunctionalComponent = () => {
  // const [isPopBinding, setIsPopBinding] = useState(false);

  return (
    <>
      <ReturnBar title="會員中心" />
      <div class="relative grow bg-[#fffbf6] overflow-y-auto no-scrollbar">
        <div className="px-5 bg-white">
          <UserSection showVIP={true} />
        </div>
        <div className="my-4"></div>
        <ServiceList
        // isPopBinding={isPopBinding}
        // setIsPopBinding={setIsPopBinding}
        />
      </div>
      <FooterBar />
    </>
  );
};

export default ProfilePage;
