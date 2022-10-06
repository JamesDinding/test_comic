import { h, FunctionalComponent, Fragment as F } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import ReturnBar from "../components/ReturnBar";
import SelectionBar from "../components/SelectionBar";
import Empty from "../components/Collect/Empty";
import BookListItem from "../components/_Book/ListItem";
import CollectItem from "../components/_Book/CollectItem";
import { ObserverProvider } from "../context/observer";
import FooterBar from "../components/FooterBar";
import RecommendTitleBar from "../components/Home/RecommendTitleBar";
import { getOrders } from "../lib/api";

const comicArr = ["123", "234", "345", "456", "567", "678"];
//col-span-full
const adArr = ["fxck_me"];

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
  const [curPress, setCurPress] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null!);

  const unPressHandler = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement | HTMLImageElement;
    target.nodeName !== "IMG" && setCurPress(-1);
  };

  useEffect(() => {
    try {
      (async () => {
        const data = await getOrders();
        console.log(data);
      })();
    } catch {
      console.log("failed");
    }
  });

  return (
    <F>
      <ReturnBar title="我的收藏" />
      <SelectionBar
        tabArr={temp_tab_arr}
        curSelect={curSelect}
        setCurSelect={setCurSelect}
      />
      <div
        class="grow relative bg-white overflow-y-auto no-scrollbar flex flex-col"
        ref={containerRef}
      >
        <ObserverProvider rootElement={containerRef}>
          {curSelect === 0 &&
            (temp_collect_arr.length ? (
              <div className="grow bg-[#fffbf6]">
                <div
                  className=" items-box grid grid-cols-3 gap-2.5 py-4 px-5"
                  onClick={unPressHandler}
                >
                  {temp_collect_arr.map((collect, i, arr) => {
                    return (
                      <CollectItem
                        Data={{ ID: 12345, Cover: "", Name: "test" }}
                        index_temp={i}
                        curPress={curPress}
                        setCurPress={setCurPress}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <F>
                <Empty />
                <div className="mx-5 mt-5">
                  <RecommendTitleBar BlockID={124} BlockName="舊品下市" />
                  <div className="items-box grid grid-cols-3 gap-2.5 py-4">
                    {comicArr.concat(adArr).map((el, i, arr) => {
                      return i === 0 ? (
                        <div className="min-h-[100px] rounded bg-[#ff978d] col-span-full">
                          <span class="text-white">ad</span>
                        </div>
                      ) : (
                        <BookListItem
                          Data={{ ID: 12345, Cover: "", Name: "test" }}
                          type="separate"
                        />
                      );
                    })}
                  </div>
                </div>
              </F>
            ))}
          {curSelect === 1 &&
            (temp_purchase_arr.length ? (
              <div className="grow bg-[#fffbf6]">
                <div className="items-box grid grid-cols-3 gap-2.5 py-4 px-5">
                  {temp_purchase_arr.map((purchase, i, arr) => {
                    return (
                      <CollectItem
                        Data={{ ID: 12345, Cover: "", Name: "test" }}
                        index_temp={i}
                        curPress={curPress}
                        setCurPress={setCurPress}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <F>
                <Empty />
                <div className="mx-5 mt-5">
                  <RecommendTitleBar BlockID={124} BlockName="舊品下市" />
                  <div className="items-box grid grid-cols-3 gap-2.5 py-4">
                    {comicArr.concat(adArr).map((el, i, arr) => {
                      return i === 0 ? (
                        <div className="min-h-[100px] rounded bg-[#ff978d] col-span-full">
                          <span class="text-white">ad</span>
                        </div>
                      ) : (
                        <BookListItem
                          Data={{ ID: 12345, Cover: "", Name: "test" }}
                          type="separate"
                        />
                      );
                    })}
                  </div>
                </div>
              </F>
            ))}
        </ObserverProvider>
      </div>
      <FooterBar />
    </F>
  );
};

export default CollectPage;
