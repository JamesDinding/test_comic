import { FunctionalComponent, h, Fragment } from "preact";
import SelectionBar from "../../components/SelectionBar";
import ChargeRecord from "../../components/Profile/Services/Record/ChargeRecord";
import ReturnBar from "../../components/ReturnBar";

const desArr = [
  { url: "/purchase-record", title: "購買記錄", icon: "" },
  { url: "/charge-record", title: "充值記錄", icon: "" },
];

const ChargeRecordPage: FunctionalComponent = () => {
  return (
    <>
      <ReturnBar title={desArr[1].title} />
      <SelectionBar destinationArr={desArr} />
      <ChargeRecord />
    </>
  );
};

export default ChargeRecordPage;
