import { FunctionalComponent, h, Fragment } from "preact";
import Router from "preact-router";
import { createPortal } from "preact/compat";
import { useState, useEffect } from "preact/hooks";
import { useRouter } from "../context/router";
import { useUser } from "../context/user";
import DefaultRouteHandler from "../components/DefaultRouteHandler";
import BackDrop from "../components/BackDrop";
import ModalNotification from "../components/Modal/ModalNotification";
import HomePage from "./Home";
import CategoryPage from "./Category";
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
import SearchPage from "./Search";

const AppRoute: FunctionalComponent = () => {
  const { isLegit } = useRouter();
  const { isLogIn, logout } = useUser();
  const [isPop, setIsPop] = useState(false);

  useEffect(() => {
    setIsPop(false);
    if (!isLegit && isLogIn) {
      setIsPop(true);
    }
  }, [isLegit, isLogIn]);

  return (
    <>
      {!isLegit &&
        isLogIn &&
        isPop &&
        createPortal(
          <BackDrop
            onClose={setIsPop}
            onCallback={() => {
              logout();
            }}
          />,
          document.getElementById("back-drop")!
        )}
      {!isLegit && isLogIn && isPop && (
        <ModalNotification
          onClose={() => {
            logout();
            setIsPop(false);
          }}
        />
      )}
      <Router>
        <HomePage path="/home" />
        <CategoryPage path="/home/:category_id" />
        <CollectPage path="/collect" />
        <ProfilePage path="/profile" />

        <DirectoryPage path="/directory/:cid" />
        <ReadPage path="/read/:directoryId/chapter/:id" />

        <RegisterPage path="/register" />
        <LoginPage path="/login" />

        <ChargePage path="/charge" />
        <RecordPage path="/record" />

        <MorePage path="/more/:id" />
        <SearchPage path="/search" />

        <CustomerPage path="/service" />
        <DefaultRouteHandler default />
      </Router>
    </>
  );
};

export default AppRoute;
