import { h, FunctionalComponent, Fragment as F } from "preact";
import { useRouter } from "../context/router";
import CustomLink from "../components/CustomLink";
import { route } from "preact-router";

const UcPage: FunctionalComponent = () => {
  const { customRouter, currentRoute, tempData, isUc, ucQueue, ucQ, pushUcQ } =
    useRouter();
  return (
    <div className="p-5 bg-amber-200">
      <div className="m-10">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (true) route("/collect");
            return null;
          }}
        >
          test anchor tag
        </a>
      </div>
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
      <div className="flex gap-2">
        <div className="p-5">
          stack:
          <div className="max-h-[200px] overflow-y-auto">
            {customRouter.routerStack.map((r, i) => (
              <div key={i}>{r}</div>
            ))}
          </div>
        </div>
        <div className="p-5">
          Queue:{" "}
          <div className="max-h-[200px] overflow-y-auto">
            {ucQ.map((q) => (
              <div>{q}</div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="p-5">history.state: {history.state}</div> */}
      <div className="p-5">tempData: {tempData}</div>
    </div>
  );
};

export default UcPage;
