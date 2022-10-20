// DEBUG, make sure that this import is the first import in your whole app
import "preact/debug";

import { FunctionalComponent, h, Fragment } from "preact";
import Router from "preact-router";
import { useEffect, useState } from "preact/hooks";

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
  // const [showSmartBanner, setShowSmartBanner] = useState(true);
  const [hadSendTC, setHadSendTC] = useState(true);

  useEffect(() => {
    if (hadSendTC) return;
    function getQueryVariable(variable: string) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
        }
      }
      console.log("Query variable %s not found", variable);
      return null;
    }
    const tt = getQueryVariable("tt") || "";
    const tc = getQueryVariable("tc") || "";
    fetch(`/api/v1/init?tt=${tt}&tc=${tc}`)
      .then((res) => {
        console.log(res);
        if (!res.ok) throw new Error("referrer no response");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setHadSendTC(true);
      })
      .catch((err) => {
        console.error(err.message || "referrer error");
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
                {/* <RecoveryPage path="/recovery" /> */}

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
  ) : (
    <div></div>
  );
};

export default App;
