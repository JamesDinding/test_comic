import { FunctionalComponent, h, Fragment } from "preact";
import { useState } from "preact/hooks";
import SelectionBar from "../../components/SelectionBar";
import PurchaseList from "../../components/Profile/Services/Record/PurchaseList";
import ChargeList from "../../components/Profile/Services/Record/ChargeList";
import ReturnBar from "../../components/ReturnBar";
import FooterBar from "../../components/FooterBar";

const desArr = ["充值记录", "购买记录"];

const RecordPage: FunctionalComponent = () => {
  const [curSelect, setCurSelect] = useState(0);

  return (
    <>
      <ReturnBar title={"钱包纪录"} />
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
