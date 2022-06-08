import { FunctionalComponent, h, Fragment } from "preact";
import EndBottom from "../../../EndBottom";
import Empty from "./Empty";

let fetchData = [];

const PurchaseRecord = () => {
  return (
    <>
      <div></div>
      <EndBottom />
      {fetchData.length === 0 && <Empty title="去逛逛" url="home" />}
    </>
  );
};

export default PurchaseRecord;
