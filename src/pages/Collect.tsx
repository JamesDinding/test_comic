import { h, FunctionalComponent, Fragment as F } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import ReturnBar from "../components/ReturnBar";
import SelectionBar from "../components/SelectionBar";
import Empty from "../components/Collect/Empty";
import BookListItem from "../components/_Book/ListItem";
import CollectItem from "../components/_Book/CollectItem";
import { ObserverProvider } from "../context/observer";
import FooterBar from "../components/FooterBar";
import { getMyBookmarks, getMyAcquisitions, getBlockById } from "../lib/api";
import { useDomain } from "../context/domain";
import { useUser } from "../context/user";
import { defaultLocalStorage } from "../const";
import RecommendTitleBar from "../components/Home/RecommendTitleBar";

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
    if (!isLogIn) {
      const collect = JSON.parse(
        localStorage.getItem("sjmh") || defaultLocalStorage
      ).collection;

      setCollectList(collect);

      return;
    }
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
    getBlockById(44)
      .then((response) => {
        setRecommendBlock(response.data?.sort(() => Math.random() - 0.5));
        setDomain(response.domain);
      })
      .catch((err) => {
        console.error(err.message || "failed");
      });
  }, []);

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
            (collectList?.length ? (
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
                <Empty
                  hasButton={true}
                  btnConfig={{ href: "/home", msg: "去逛逛" }}
                />
              </F>
            ))}
          {curSelect === 1 &&
            (acquisitions?.length ? (
              <div className="grow bg-[#fcf6ff]">
                <div className="items-box grid grid-cols-6 gap-2.5 py-4 px-5">
                  {acquisitions.map((purchase: any, i, arr) => {
                    return <BookListItem Data={purchase} type="separate" />;
                  })}
                </div>
              </div>
            ) : (
              <F>
                <Empty
                  hasButton={true}
                  btnConfig={{ href: "/charge", msg: "去充值" }}
                />
              </F>
            ))}
          <div className="mx-5 mt-5">
            <RecommendTitleBar
              BlockID={44}
              BlockName="新书上架"
              onDefaultBehavior={false}
            />
            <div className="items-box grid grid-cols-6 gap-2.5 py-4">
              {recommendBlock.slice(0, 9).map((el: Book, i, arr) => {
                return (
                  <BookListItem
                    Data={el}
                    type="separate"
                    collectCallBack={(data, iscollected) => {
                      setCollectList((prev) => {
                        if (iscollected) {
                          return prev.filter((p) => p.id !== el.id);
                        }
                        return prev.concat(data);
                      });
                    }}
                  />
                );
              })}
            </div>
          </div>
        </ObserverProvider>
      </div>
      <div className="grow bg-[#fcf6ff]"></div>
      <FooterBar />
    </F>
  );
};

export default CollectPage;
