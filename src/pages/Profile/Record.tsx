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
      <div className="bg-[#faf6ff] mt-1 overflow-y-scroll no-scrollbar h-full">
        {curSelect === 0 && <ChargeList />}
        {curSelect === 1 && <PurchaseList />}
      </div>
      <FooterBar />
    </>
  );
};

export default RecordPage;
