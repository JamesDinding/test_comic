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
import {
  getMyBookmarks,
  getMyAcquisitions,
  getAllBlock,
  getRandomBlock,
} from "../lib/api";
import { useDomain } from "../context/domain";
import { useUser } from "../context/user";

const temp_tab_arr = ["收藏纪录", "购买记录"];

const CollectPage: FunctionalComponent = () => {
  const { setDomain } = useDomain();
  const { isLogIn } = useUser();
  const [collectList, setCollectList] = useState<Array<Book>>([]);
  const [acquisitions, setAcquisitions] = useState<Array<Book>>([]);
  const [recommendBlock, setRecommendBlock] = useState([]);
  const [curSelect, setCurSelect] = useState(0);
  const [curPress, setCurPress] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null!);

  const unPressHandler = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement | HTMLImageElement;
    target.nodeName !== "IMG" && setCurPress(-1);
  };

  useEffect(() => {
    if (!isLogIn) return;
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
      console.error("failed");
    }
  }, [curSelect, isLogIn]);

  useEffect(() => {
    if (collectList.length === 0 || acquisitions.length === 0) {
      getRandomBlock(9)
        .then((response) => {
          setRecommendBlock(response.data["新书上架"]);
          setDomain(response.domain);
        })
        .catch((err) => {
          console.error(err.message || "failed");
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
              <div className="grow bg-[#fcf6ff]">
                <div
                  className=" items-box grid grid-cols-3 gap-2.5 py-4 px-5"
                  onClick={unPressHandler}
                >
                  {collectList.map((collect: any, i, arr) => {
                    return (
                      <CollectItem
                        Data={collect}
                        index_temp={i}
                        curPress={curPress}
                        setCurPress={setCurPress}
                        updateList={setCollectList}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <F>
                <Empty />
                {/* <div className="mx-5 mt-5">
                  <RecommendTitleBar BlockID={124} BlockName="新书上架" />
                  <div className="items-box grid grid-cols-3 gap-2.5 py-4">
                    {recommendBlock.map((el: Book, i, arr) => {
                      return <BookListItem Data={el} type="separate" />;
                    })}
                  </div>
                </div> */}
              </F>
            ))}
          {curSelect === 1 &&
            (acquisitions.length ? (
              <div className="grow bg-[#fcf6ff]">
                <div className="items-box grid grid-cols-3 gap-2.5 py-4 px-5">
                  {acquisitions.map((purchase: any, i, arr) => {
                    return <BookListItem Data={purchase} type="separate" />;
                  })}
                </div>
              </div>
            ) : (
              <F>
                <Empty />
                {/* <div className="mx-5 mt-5">
                  <RecommendTitleBar BlockID={124} BlockName="新书上架" />
                  <div className="items-box grid grid-cols-3 gap-2.5 py-4">
                    {recommendBlock.map((el: Book, i, arr) => {
                      return <BookListItem Data={el} type="separate" />;
                    })}
                  </div>
                </div> */}
              </F>
            ))}
        </ObserverProvider>
      </div>
      <div className="grow bg-[#fcf6ff]"></div>
      <FooterBar />
    </F>
  );
};

export default CollectPage;
