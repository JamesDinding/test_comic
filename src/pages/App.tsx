// DEBUG, make sure that this import is the first import in your whole app
import "preact/debug";

import { FunctionalComponent, h, Fragment } from "preact";
import Router from "preact-router";
import { useEffect, useState } from "preact/hooks";

import { ChargeProvider } from "../context/charge";
import { UserProvider } from "../context/user";
import { DomainProvider } from "../context/domain";
import DefaultRouteHandler from "../components/DefaultRouteHandler";

import HomePage from "./Home";
import VideoPage from "./Video";
import CollectPage from "./Collect";
import ProfilePage from "./Profile";
import DirectoryPage from "./Directory";
import ReadPage from "./Read";
import RegisterPage from "./Profile/Register";
import LoginPage from "./Profile/Login";
import ChargePage from "./Profile/Charge";
import RecordPage from "./Profile/Record";
import CustomerPage from "./Profile/Customer";
import SearchPage from "./Search";

const App: FunctionalComponent = () => {
  // const [showSmartBanner, setShowSmartBanner] = useState(true);
  const [hadSendTC, setHadSendTC] = useState(false);

  useEffect(() => {
    if (hadSendTC) return;
    const query = window.location.search;

    fetch(`/api/v1/auth/init${query}`)
      .then((res) => {
        if (!res.ok) throw new Error("referrer no response");
        return res.json();
      })
      .then((data) => {
        setHadSendTC(true);
      })
      .catch((err) => {
        console.error(err.message || "referrer error");
        setHadSendTC(true);
      });
  }, [hadSendTC]);

  return hadSendTC ? (
    <DomainProvider>
      <UserProvider>
        <ChargeProvider>
          <div id="root" class="w-full max-w-[420px] h-full">
            <div id="container" class="bg-white w-full h-full flex flex-col">
              {/* {showSmartBanner ? (
                <SmartBanner SetSmartBannerVisiblity={setShowSmartBanner} />
              ) : (
                <></>
              )} */}

              <Router>
                <HomePage path="/home" />
                <VideoPage path="/video-home" />
                <CollectPage path="/collect" />
                <ProfilePage path="/profile" />

                <DirectoryPage path="/directory/:cid" />
                <ReadPage path="/read/:directoryId/chapter/:id" />

                <RegisterPage path="/register" />
                <LoginPage path="/login" />

                <ChargePage path="/charge" />
                <RecordPage path="/record" />

                <CustomerPage path="/service" />
                <SearchPage path="/search" />

                <DefaultRouteHandler default />
              </Router>

              {/* <FooterBar /> */}
            </div>
          </div>
          <div id="back-drop"></div>
          <div id="pop-window"></div>
        </ChargeProvider>
      </UserProvider>
    </DomainProvider>
  ) : (
    <div></div>
  );
};

export default App;
