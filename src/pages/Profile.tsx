import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import UserSection from "../components/Profile/UserSection";
import ServiceList from "../components/Profile/ServiceList";
import ReturnBar from "../components/ReturnBar";
import FooterBar from "../components/FooterBar";

import { useUser } from "../context/user";

const ProfilePage: FunctionalComponent = () => {
  // const [isPopBinding, setIsPopBinding] = useState(false);
  const { isLogIn, getUserStatus } = useUser();

  useEffect(() => {
    if (!isLogIn) return;
    try {
      getUserStatus();
    } catch {
      console.log("failed to get user data");
    }
  });

  return (
    <>
      <ReturnBar title="會員中心" defaultDestination="/home" />
      <div class="relative grow bg-[#fcf6ff] overflow-y-auto no-scrollbar">
        <div className="px-5 mb-1 bg-white">
          <UserSection showVIP={true} />
        </div>
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
