import { FunctionalComponent, h, Fragment } from "preact";
import PurchaseRecord from "../components/Profile/Services/Record/PurchaseRecord";
import SelectionBar from "../components/SelectionBar";

const desArr = [
  { url: "/purchase-record", title: "購買記錄" },
  { url: "/charge-record", title: "充值記錄" },
];

const PurchaseRecordPage: FunctionalComponent = () => {
  return (
    <>
      <SelectionBar destinationArr={desArr} />
      <PurchaseRecord />
    </>
  );
};

export default PurchaseRecordPage;
