import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useRef } from "preact/hooks";
import ReturnBar from "../components/ReturnBar";
import SelectionBar from "../components/SelectionBar";
import Empty from "../components/Collect/Empty";
import BookListItem from "../components/_Book/ListItem";
import { ObserverProvider } from "../context/observer";
import FooterBar from "../components/FooterBar";

// temp data
const temp_tab_arr = ["收藏紀錄", "購買記錄  "];
const temp_purchase_arr: { Cover: string; ID: number; Name: string } | [] = [];
const temp_collect_arr = [
  { Cover: "123", ID: 1234, Name: "test_name" },
  { Cover: "123", ID: 1234, Name: "test_name" },
  { Cover: "123", ID: 1234, Name: "test_name" },
  { Cover: "123", ID: 1234, Name: "test_name" },
];

const CollectPage: FunctionalComponent = () => {
  const [curSelect, setCurSelect] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null!);

  return (
    <>
      <ReturnBar title="我的收藏" />
      <div
        class="relative grow bg-white overflow-y-auto no-scollbar"
        ref={containerRef}
      >
        <ObserverProvider rootElement={containerRef}>
          <SelectionBar
            tabArr={temp_tab_arr}
            curSelect={curSelect}
            setCurSelect={setCurSelect}
          />
          {curSelect === 0 &&
            (temp_collect_arr.length ? (
              <div className="items-box grid grid-cols-3 gap-2.5 py-4 px-5">
                {temp_collect_arr.map((collect, i, arr) => {
                  return (
                    <BookListItem
                      Data={{ ID: 12345, Cover: "", Name: "test" }}
                      type="separate"
                    />
                  );
                })}
              </div>
            ) : (
              <Empty />
            ))}
          {curSelect === 1 &&
            (temp_purchase_arr.length ? (
              <div className="items-box grid grid-cols-3 gap-2.5 py-4 px-5">
                {temp_purchase_arr.map((purchase, i, arr) => {
                  return (
                    <BookListItem
                      Data={{ ID: 12345, Cover: "", Name: "test" }}
                      type="separate"
                    />
                  );
                })}
              </div>
            ) : (
              <Empty />
            ))}
        </ObserverProvider>
      </div>
      <FooterBar />
    </>
  );
};

export default CollectPage;
