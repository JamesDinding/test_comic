import { FunctionalComponent, h, Fragment } from "preact";
import RecordBottom from "./RecordBottom";
import Empty from "./Empty";

let fetchData = [];

const ChargeRecord = () => {
  return (
    <>
      <div></div>
      <RecordBottom />
      {fetchData.length === 0 && <Empty title="立即充值" url="/charge" />}
    </>
  );
};

export default ChargeRecord;
