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
import { getMyBookmarks, getMyAcquisitions, getAllBlock } from "../lib/api";
import { useDomain } from "../context/domain";

const comicArr = ["123", "234", "345", "456", "567", "678"];
//col-span-full
const adArr = ["fxck_me"];

// temp data
const temp_tab_arr = ["收藏紀錄", "購買記錄"];

const CollectPage: FunctionalComponent = () => {
  const { setDomain } = useDomain();
  const [collectList, setCollectList] = useState([]);
  const [acquisitions, setAcquisitions] = useState([]);
  const [recommendBlock, setRecommendBlock] = useState([]);
  const [curSelect, setCurSelect] = useState(0);
  const [curPress, setCurPress] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null!);

  const unPressHandler = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement | HTMLImageElement;
    target.nodeName !== "IMG" && setCurPress(-1);
  };

  useEffect(() => {
    try {
      if (curSelect === 0)
        (async () => {
          const { data, domain } = await getMyBookmarks();
          setDomain(domain);
          setCollectList(data);
        })();
      if (curSelect === 1)
        (async () => {
          const { data, domain } = await getMyAcquisitions();
          setDomain(domain);
          setAcquisitions(data);
        })();
    } catch {
      console.log("failed");
    }
  }, [curSelect]);

  useEffect(() => {
    if (collectList.length === 0 || acquisitions.length === 0) {
      getAllBlock("type=吸睛首選")
        .then((response) => {
          setRecommendBlock(response.data["吸睛首選"]);
          setDomain(response.domain);
        })
        .catch((err) => {
          console.log(err.message || "failed");
        });
    }
  }, [collectList, curSelect]);

  return (
    <F>
      <ReturnBar title="我的收藏" defaultDestination="/home" />
      <SelectionBar
        tabArr={temp_tab_arr}
        curSelect={curSelect}
        setCurSelect={setCurSelect}
      />
      <div
        class="relative bg-white overflow-y-auto no-scrollbar flex flex-col"
        ref={containerRef}
      >
        <ObserverProvider rootElement={containerRef}>
          {curSelect === 0 &&
            (collectList.length ? (
              <div className="grow bg-[#fffbf6]">
                <div
                  className=" items-box grid grid-cols-3 gap-2.5 py-4 px-5"
                  onClick={unPressHandler}
                >
                  {collectList.map((collect: any, i, arr) => {
                    return (
                      <CollectItem
                        Data={{
                          ID: collect.id,
                          Cover: collect.covers?.thumb,
                          Name: collect.title,
                        }}
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
                  <RecommendTitleBar BlockID={124} BlockName="新品上市" />
                  <div className="items-box grid grid-cols-3 gap-2.5 py-4">
                    {recommendBlock.map((el: Book, i, arr) => {
                      return <BookListItem Data={el} type="separate" />;
                    })}
                  </div>
                </div>
              </F>
            ))}
          {curSelect === 1 &&
            (acquisitions.length ? (
              <div className="grow bg-[#fffbf6]">
                <div className="items-box grid grid-cols-3 gap-2.5 py-4 px-5">
                  {acquisitions.map((purchase: any, i, arr) => {
                    return (
                      <CollectItem
                        Data={{
                          ID: purchase.id,
                          Cover: purchase.covers.thumb,
                          Name: purchase.title,
                        }}
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
                  <RecommendTitleBar BlockID={124} BlockName="新品上市" />
                  <div className="items-box grid grid-cols-3 gap-2.5 py-4">
                    {recommendBlock.map((el: Book, i, arr) => {
                      return <BookListItem Data={el} type="separate" />;
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
