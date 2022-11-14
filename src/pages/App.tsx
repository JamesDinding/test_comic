// DEBUG, make sure that this import is the first import in your whole app
import "preact/debug";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import { FunctionalComponent, h } from "preact";
import Router from "preact-router";
import { useEffect, useState } from "preact/hooks";

import { ChargeProvider } from "../context/charge";
import { UserProvider } from "../context/user";
import { DomainProvider } from "../context/domain";
import { ModalProvider } from "../context/modal";
import { RouterProvider } from "../context/router";
import DefaultRouteHandler from "../components/DefaultRouteHandler";

import HomePage from "./Home";
import CollectPage from "./Collect";
import ProfilePage from "./Profile";
import DirectoryPage from "./Directory";
import ReadPage from "./Read";
import RegisterPage from "./Profile/Register";
import LoginPage from "./Profile/Login";
import ChargePage from "./Profile/Charge";
import RecordPage from "./Profile/Record";
import CustomerPage from "./Profile/Customer";
import MorePage from "./More";

const App: FunctionalComponent = () => {
  const [showSmartBanner, setShowSmartBanner] = useState(true);
  const [hadSendTC, setHadSendTC] = useState(false);

  useEffect(() => {
    if (hadSendTC) return;
    const query = window.location.search;
    const queryList = query.slice(1).split("&");
    let queryObj: any = {};
    queryList.map((query, i) => {
      const temp: string[] = query.split("=");
      queryObj[temp[0]] = temp[1];
    });

    if (queryObj.app) {
      setShowSmartBanner(false);
      localStorage.setItem("sjmh_device", queryObj.app);
    } else {
      localStorage.setItem("sjmh_device", "web");
    }

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
    <ErrorBoundary>
      <RouterProvider>
        <DomainProvider>
          <ModalProvider>
            <UserProvider>
              <ChargeProvider>
                <div id="root" class="w-full max-w-[420px] h-full">
                  <div
                    id="container"
                    class="bg-white w-full h-full flex flex-col"
                  >
                    <Router>
                      <HomePage
                        path="/home"
                        showBanner={showSmartBanner}
                        setShowBanner={setShowSmartBanner}
                      />
                      <CollectPage path="/collect" />
                      <ProfilePage path="/profile" />

                      <DirectoryPage path="/directory/:cid" />
                      <ReadPage path="/read/:directoryId/chapter/:id" />

                      <RegisterPage path="/register" />
                      <LoginPage path="/login" />

                      <ChargePage path="/charge" />
                      <RecordPage path="/record" />

                      <MorePage path="/more/:id" />

                      <CustomerPage path="/service" />
                      <DefaultRouteHandler default />
                    </Router>
                  </div>
                </div>
                <div id="back-drop"></div>
                <div id="pop-window"></div>
              </ChargeProvider>
            </UserProvider>
          </ModalProvider>
        </DomainProvider>
      </RouterProvider>
    </ErrorBoundary>
  ) : (
    <div></div>
  );
};

export default App;
