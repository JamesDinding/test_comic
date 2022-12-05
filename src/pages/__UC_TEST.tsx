import { h, FunctionalComponent, Fragment as F } from "preact";
import { useRouter } from "../context/router";
import CustomLink from "../components/CustomLink";

const UcPage: FunctionalComponent = () => {
  const { customRouter, currentRoute, tempData, isUc } = useRouter();
  return (
    <div className="p-5 bg-amber-200">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, i) => (
        <CustomLink
          href={`/__uc_test/${el}`}
          className="mx-2 p-2 bg-red-400"
          activeClassName="mx-2 p-2 bg-red-700"
          key={i}
        >
          {el}
        </CustomLink>
      ))}
      <div className="p-5">isUC: {isUc ? "true" : "false"}</div>
      <div className="p-5">browser url: {window.location.pathname}</div>
      <div className="p-5">current: {currentRoute}</div>
      <div className="p-5">
        stack:
        {customRouter.routerStack.map((r, i) => (
          <div key={i}>{r}</div>
        ))}
      </div>
      {/* <div className="p-5">history.state: {history.state}</div> */}
      <div className="p-5">tempData: {tempData}</div>
    </div>
  );
};

export default UcPage;