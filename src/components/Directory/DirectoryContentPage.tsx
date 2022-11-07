import { h, FunctionalComponent, Fragment as F } from "preact";
import { useRef, useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import Description from "./Description";
import ChapterList from "./ChapterList";
import ReturnBar from "../ReturnBar";
import FooterBar from "../FooterBar";
import RecommendBlock from "../Home/RecommendBlock";
import BookListItem from "../_Book/ListItem";
import RecommendTitleBar from "../Home/RecommendTitleBar";
import { ObserverProvider } from "../../context/observer";
import ModalBuy from "../Modal/ModalBuy";
import IconBookmark from "../../resources/img/icon-bookmark.svg";
import IconBookmarkGray from "../../resources/img/icon-bookmark-gray.svg";
import { getAllBlock, getSpecifiedBook, postMyBookmarks } from "../../lib/api";
import { useDomain } from "../../context/domain";
import { useUser } from "../../context/user";
import { defaultLocalStorage } from "../../const";

const DirectoryContentPage: FunctionalComponent = () => {
  const { isLogIn } = useUser();
  const { setDomain } = useDomain();
  const containerRef = useRef<HTMLDivElement>(null!);
  const [content, setContent] = useState<Content>();
  const [recommendBlock, setRecommendBlock] = useState();

  const cur_url = window.location.href.split("/").pop();
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
    getSpecifiedBook(cur_url)
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
      });
  }, []);

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
              onClick={() => route("/read/" + cur_url + "/chapter/1")}
            >
              开始阅读
            </button>
            <button
              className="flex flex-col items-center ml-5 w-12"
              onClick={() => {
                setIsCollected((prev) => !prev);
                if (isLogIn) {
                  postMyBookmarks(
                    content?.id,
                    isCollected ? "remove" : "add"
                  ).then((data) => {
                    // console.log("req response data:", data);
                  });
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
        {/* <RecommendTitleBar BlockID={124} BlockName="新品上市" />
            <div className="items-box grid grid-cols-3 gap-2.5 py-4">
              {comicArr.map((el, i, arr) => {
                return (
                  <BookListItem
                    Data={{ ID: 12345, Cover: "", Name: "test" }}
                    type="separate"
                  />
                );
              })}
            </div> */}
        {/* <RecommendBlock
          BlockID={1236}
          BlockName={"吸睛首选"}
          Items={recommendBlock['吸睛首选']}
          ItemPerRow={3}
        /> */}
      </ObserverProvider>
      <FooterBar />
    </F>
  );
};

export default DirectoryContentPage;
