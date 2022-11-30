import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import UserSection from "../components/Profile/UserSection";
import ServiceList from "../components/Profile/ServiceList";
import ReturnBar from "../components/ReturnBar";
import FooterBar from "../components/FooterBar";

import { useUser } from "../context/user";
import { useRouter } from "../context/router";

const ProfilePage: FunctionalComponent = () => {
  const { isLogIn, getUserStatus } = useUser();
  const { tc } = useRouter();

  // click more than 5 times show the logout btn
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (!isLogIn) return;
    try {
      getUserStatus();
    } catch {
      console.error("failed to get user data");
    }
  });

  return (
    <>
      <ReturnBar
        title="会员中心"
        defaultDestination="/home"
        callback={() => {
          setClickCount((prev) => prev + 1);
        }}
      />
      <div class="relative grow bg-[#fcf6ff] overflow-y-auto no-scrollbar">
        <div className="px-5 mb-1 bg-white">
          <UserSection showVIP={true} />
        </div>
        <ServiceList clickCount={clickCount} />
        <div className="pt-8 bg-[#fcf6ff] text-sm text-center text-gray-500 tracking-wide">
          水晶漫画永久域名:
          <a
            className="ml-5 text-[#0000EE]"
            href={`https://sjmh.top?paymode=1&tc=${tc || 106}`}
            target="_blank"
          >
            sjmh.top
          </a>
        </div>
      </div>
      <FooterBar />
    </>
  );
};

export default ProfilePage;
