// DEBUG, make sure that this import is the first import in your whole app
import "preact/debug";

import { FunctionalComponent, h, Fragment } from "preact";
import Router from "preact-router";
import { useState } from "preact/hooks";

import { ChargeProvider } from "../context/charge";
import { UserProvider } from "../context/user";
import { DomainProvider } from "../context/domain";
import SmartBanner from "../components/SmartBanner";
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
import RecoveryPage from "./Profile/Recovery";
import RecordPage from "./Profile/Record";
import CustomerPage from "./Profile/Customer";
import SearchPage from "./Search";
// Test page
import TestPage from "./Test";

const App: FunctionalComponent = () => {
  const [showSmartBanner, setShowSmartBanner] = useState(true);

  return (
    <DomainProvider>
      <UserProvider>
        <ChargeProvider>
          <div id="root" class="w-full max-w-[420px] h-full">
            <div id="container" class="bg-white w-full h-full flex flex-col">
              {showSmartBanner ? (
                <SmartBanner SetSmartBannerVisiblity={setShowSmartBanner} />
              ) : (
                <></>
              )}

              <Router>
                <HomePage path="/home" />
                <VideoPage path="/video-home" />
                <CollectPage path="/collect" />
                <ProfilePage path="/profile" />

                <DirectoryPage path="/directory/:cid" />
                <ReadPage path="/read/:id" />

                <RegisterPage path="/register" />
                <LoginPage path="/login" />

                <ChargePage path="/charge" />
                <RecordPage path="/record" />
                <RecoveryPage path="/recovery" />

                <CustomerPage path="/service" />
                <SearchPage path="/search" />

                {/* test page */}
                <TestPage path="/test" />

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
  );
};

export default App;
