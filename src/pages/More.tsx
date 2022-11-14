import { h, FunctionalComponent, Fragment as F } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import ReturnBar from "../components/ReturnBar";
import MoreResultList from "../components/More/MoreResultList";
import RecommendBlock from "../components/Home/RecommendBlock";
import { getBlockById } from "../lib/api";
import { ObserverProvider } from "../context/observer";

const MorePage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);

  const [moreResult, setMoreResult] = useState<Book[]>([]);
  const [moreBlockId, setMoreBlockId] = useState(
    parseInt(window.location.pathname.split("/").pop() || "0", 10)
  );
  const [titleName, setTitleName] = useState(
    window.location.search.split("=").pop() || ""
  );

  const [recommendBlock, setRecommendBlock] = useState<Book[]>([]);

  useEffect(() => {
    if (moreBlockId === 0) return;
    getBlockById(moreBlockId)
      .then((response) => {
        setMoreResult(response.data);
      })
      .catch((err) => {
        console.error(err.message || "failed");
        setMoreResult([]);
      });
  }, [moreBlockId]);

  useEffect(() => {
    if (moreResult.length !== 0) return;
    getBlockById(44)
      .then((response) => {
        setRecommendBlock(response.data);
      })
      .catch((err) => {
        console.error(err.message || "failed");
        setRecommendBlock([]);
      });
  }, [moreResult.length]);

  return (
    <F>
      <ReturnBar title={titleName} type="home" />
      <div
        id="scroll"
        className="grow overflow-hidden overflow-y-auto"
        ref={containerRef}
      >
        <ObserverProvider rootElement={containerRef}>
          <MoreResultList content={moreResult} moreBlockId={moreBlockId} />
          {moreResult.length === 0 && (
            <div className="mx-5 mt-5">
              <RecommendBlock
                BlockID={44}
                Items={recommendBlock}
                ItemPerRow={3}
                BlockName="新书上架"
              />
            </div>
          )}
        </ObserverProvider>
      </div>
    </F>
  );
};

export default MorePage;
