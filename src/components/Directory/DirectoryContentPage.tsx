import { h, FunctionalComponent, Fragment as F } from "preact";
import { useRef, useState, useEffect, useMemo } from "preact/hooks";
import { route } from "preact-router";
import { useRouter } from "../../context/router";
import Description from "./Description";
import ChapterList from "./ChapterList";
import ReturnBar from "../ReturnBar";
import FooterBar from "../FooterBar";
import { ObserverProvider } from "../../context/observer";
import ModalBuy from "../Modal/ModalBuy";
import IconBookmark from "../../resources/img/icon-bookmark.svg";
import IconBookmarkGray from "../../resources/img/icon-bookmark-gray.svg";
import { getSpecifiedBook, postMyBookmarks } from "../../lib/api";
import { useDomain } from "../../context/domain";
import { useUser } from "../../context/user";
import { defaultLocalStorage } from "../../const";
import { useReadingModal } from "../../context/reading";
import Loading from "../Modal/Loading";

import { InMemoryStore } from "../../lib/api";

const DirectoryContentPage: FunctionalComponent = () => {
  const { popBuy, setStuffInfo } = useReadingModal();
  const { currentRoute, customRouter, isLoading, shutLoading } = useRouter();
  const { isLogIn } = useUser();
  const { setDomain } = useDomain();
  const containerRef = useRef<HTMLDivElement>(null!);
  const [content, setContent] = useState<Content>();

  // temp collection state
  const [isCollected, setIsCollected] = useState(false);

  useEffect(() => {
    if (isLogIn) return;
    const collections = JSON.parse(
      localStorage.getItem("sjmh") || defaultLocalStorage
    ).collection;

    const hasBook = collections.find(
      (collect: Book) => collect.id === content?.id
    );

    if (hasBook) setIsCollected(true);
  }, [isLogIn, content]);

  useEffect(() => {
    getSpecifiedBook(currentRoute.split("/").pop(), 30000)
      .then((response) => {
        const { data, domain } = response;
        setContent(data);
        setDomain(domain);

        if (isLogIn) {
          setIsCollected(data.bookmark_status);
        } else {
          const collections = JSON.parse(
            localStorage.getItem("sjmh") || defaultLocalStorage
          ).collection;

          const hasBook = collections.find(
            (collect: Book) => collect.id === content?.id
          );

          if (hasBook) setIsCollected(true);
        }
      })
      .catch((err) => {
        console.error(err.message || "failed");
      })
      .finally(() => shutLoading());
  }, [currentRoute]);

  return (
    <F>
      <ObserverProvider rootElement={containerRef}>
        <ModalBuy />
        <ReturnBar title={content?.title || ""} />
        <div
          class="grow overflow-hidden overflow-y-auto px-5"
          ref={containerRef}
        >
          <Description
            key={content?.covers.thumb}
            title={content?.title}
            author={content?.creator}
            description={content?.description}
            cover={content?.covers.thumb}
            views={content?.views}
            hot={content?.hot}
          />
          <div className="flex mb-5">
            <button
              className="w-full py-2.5 text-center text-white text-lg bg-[#8d6d9f] rounded-xl"
              onClick={() => {
                if (!content?.chapter[0].status) {
                  setStuffInfo({ ...content?.chapter[0], bookId: content?.id });
                  popBuy();
                  return;
                }
                customRouter.push(
                  "/read/" + currentRoute.split("/").pop() + "/chapter/1"
                );
                route("/read/" + currentRoute.split("/").pop() + "/chapter/1");
              }}
            >
              开始阅读
            </button>
            <button
              className="flex flex-col items-center ml-5 w-12"
              onClick={() => {
                setIsCollected((prev) => !prev);
                if (isLogIn) {
                  postMyBookmarks(content?.id, isCollected ? "remove" : "add")
                    .then((data) => {
                      // console.log("req response data:", data);
                    })
                    .catch((err) => console.error(err.message));
                } else {
                  // using localStorage
                  const temp = JSON.parse(
                    localStorage.getItem("sjmh") || defaultLocalStorage
                  );
                  if (isCollected) {
                    temp.collection = temp.collection.filter(
                      (collect: Content) => collect.id !== content?.id
                    );
                  } else {
                    temp.collection.push({
                      id: content?.id,
                      title: content?.title,
                      hot: content?.hot,
                      views: content?.views,
                      covers: { thumb: content?.covers.thumb },
                    });
                  }
                  localStorage.setItem("sjmh", JSON.stringify({ ...temp }));
                }
              }}
            >
              {isCollected ? (
                <IconBookmark class="w-8 h-8" />
              ) : (
                <IconBookmarkGray class="w-8 h-8" />
              )}
              <span className="text-xs text-[#666666] text-center whitespace-nowrap">
                {isCollected ? "已收藏" : "收藏"}
              </span>
            </button>
          </div>
          <div className="pb-10">
            <ChapterList
              chapterList={content?.chapter || []}
              bookId={content?.id}
            />
          </div>
        </div>
      </ObserverProvider>
      <FooterBar />
    </F>
  );
};

export default DirectoryContentPage;
