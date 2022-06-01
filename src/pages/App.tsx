import { FunctionalComponent, h, Fragment } from "preact";
import Router from "preact-router";

import { WorkerProvider } from "./../context/worker";

import FooterBar from "../components/FooterBar";
import SmartBanner from "../components/SmartBanner";
import DefaultRouteHandler from "../components/DefaultRouteHandler";

import HomePage from "./Home";
import VideoPage from "./Video";
import BookmarkPage from "./Bookmark";
import ProfilePage from "./Profile";
import DirectoryPage from "./Directory";
import { useState } from "preact/hooks";

const App: FunctionalComponent = () => {
  const [showSmartBanner, setShowSmartBanner] = useState(true);

  return (
    <WorkerProvider>
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
            <BookmarkPage path="/bookmark" />
            <ProfilePage path="/profile" />
            <DirectoryPage path="/direcotry/:cid" />
            <DefaultRouteHandler default />
          </Router>

          <FooterBar />
        </div>
      </div>
    </WorkerProvider>
  );
};

export default App;
