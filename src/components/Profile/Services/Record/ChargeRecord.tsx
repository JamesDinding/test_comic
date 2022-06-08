import { FunctionalComponent, h, Fragment } from "preact";
import EndBottom from "../../../EndBottom";
import Empty from "./Empty";

let fetchData = [];

const ChargeRecord = () => {
  return (
    <>
      <div></div>
      <EndBottom />
      {fetchData.length === 0 && <Empty title="立即充值" url="/charge" />}
    </>
  );
};

export default ChargeRecord;
