import { FunctionalComponent, h, Fragment } from "preact";
import SelectionBar from "../components/SelectionBar";
import ChargeRecord from "../components/Profile/Services/Record/ChargeRecord";

const desArr = [
  { url: "/purchase-record", title: "購買記錄" },
  { url: "/charge-record", title: "充值記錄" },
];

const ChargeRecordPage: FunctionalComponent = () => {
  return (
    <>
      <SelectionBar destinationArr={desArr} />
      <ChargeRecord />
    </>
  );
};

export default ChargeRecordPage;
