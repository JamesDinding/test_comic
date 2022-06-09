import { FunctionalComponent, h, Fragment } from "preact";
import PurchaseRecord from "../../components/Profile/Services/Record/PurchaseRecord";
import SelectionBar from "../../components/SelectionBar";
import ReturnBar from "../../components/ReturnBar";

const desArr = [
  { url: "/purchase-record", title: "購買記錄", icon: "" },
  { url: "/charge-record", title: "充值記錄", icon: "" },
];

const PurchaseRecordPage: FunctionalComponent = () => {
  return (
    <>
      <ReturnBar title={desArr[0].title} />
      <SelectionBar destinationArr={desArr} />
      <PurchaseRecord />
    </>
  );
};

export default PurchaseRecordPage;
