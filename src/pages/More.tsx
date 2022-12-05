import { h, FunctionalComponent, Fragment as F } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import ReturnBar from "../components/ReturnBar";
import MoreResultList from "../components/More/MoreResultList";
import RecommendBlock from "../components/Home/RecommendBlock";
import { getBlockById } from "../lib/api";
import { ObserverProvider } from "../context/observer";
import { useRouter } from "../context/router";
import { useDomain } from "../context/domain";

const MorePage: FunctionalComponent = () => {
  const { setDomain } = useDomain();
  const [isPending, setIsPendng] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null!);

  const [moreResult, setMoreResult] = useState<Book[]>([]);
  const [moreBlockId, setMoreBlockId] = useState(
    parseInt(window.location.pathname.split("/").pop() || "0", 10)
  );

  const [recommendBlock, setRecommendBlock] = useState<Book[]>([]);

  useEffect(() => {
    if (moreBlockId === 0) return;
    setIsPendng(true);
    setMoreResult([{}, {}, {}, {}, {}, {}]);
    getBlockById(moreBlockId)
      .then((response) => {
        setMoreResult(response.data);
        setDomain(response.domain);
        setIsPendng(false);
      })
      .catch((err) => {
        console.error(err.message || "failed");
        setIsPendng(false);
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
      <ReturnBar
        title={localStorage.getItem("sjmh_more_type") || "更多内容"}
        type="home"
      />
      <div
        id="scroll"
        className="grow overflow-hidden overflow-y-auto"
        ref={containerRef}
      >
        <ObserverProvider rootElement={containerRef}>
          <MoreResultList
            content={moreResult}
            isPending={isPending}
            moreBlockId={moreBlockId}
          />
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
