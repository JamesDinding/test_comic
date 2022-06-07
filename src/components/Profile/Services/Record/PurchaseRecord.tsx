import { FunctionalComponent, h, Fragment } from "preact";
import RecordBottom from "./RecordBottom";
import Empty from "./Empty";

let fetchData = [];

const PurchaseRecord = () => {
  return (
    <>
      <div></div>
      <RecordBottom />
      {fetchData.length === 0 && <Empty title="去逛逛" url="home" />}
    </>
  );
};

export default PurchaseRecord;
