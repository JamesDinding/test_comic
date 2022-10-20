import { FunctionalComponent, h, Fragment } from "preact";
import { useState } from "preact/hooks";
import SelectionBar from "../../components/SelectionBar";
import PurchaseList from "../../components/Profile/Services/Record/PurchaseList";
import ChargeList from "../../components/Profile/Services/Record/ChargeList";
import ReturnBar from "../../components/ReturnBar";
import FooterBar from "../../components/FooterBar";

const desArr = ["充值記錄", "購買記錄"];

interface Charge {
  chargeList: Array<{
    id: string;
    date: string;
    coinsCharged: number;
    cashPaid: number;
    status: string;
  }>;
}
// temp data
const temp_charge = new Array(5).fill({
  id: "1234543215",
  date: "2021/10/27 12:51:59",
  coinsCharged: 30,
  cashPaid: 100,
  status: "completed",
});

const temp_charge_empty: {
  id: string;
  date: string;
  coinsCharged: number;
  cashPaid: number;
  status: string;
}[] = [];

const temp_purchase = new Array(5).fill({
  title: "防色色柴犬 - 第1話",
  date: "2021/10/12 12:12:13",
  coinsCost: 100,
  coinsRemained: 9900,
});

const RecordPage: FunctionalComponent = () => {
  const [curSelect, setCurSelect] = useState(0);

  return (
    <>
      <ReturnBar title={"錢包紀錄"} />
      <SelectionBar
        tabArr={desArr}
        curSelect={curSelect}
        setCurSelect={setCurSelect}
      />
      <div className="bg-white mt-1 overflow-y-scroll no-scrollbar">
        {curSelect === 0 && <ChargeList />}
        {curSelect === 1 && <PurchaseList />}
      </div>
      <div className="grow bg-[#fffbf6]"></div>
      <FooterBar />
    </>
  );
};

export default RecordPage;
