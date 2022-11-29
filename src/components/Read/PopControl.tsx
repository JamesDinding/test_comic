import { h, FunctionalComponent, Fragment as F } from "preact";
import { route } from "preact-router";
import { useRouter } from "../../context/router";
import { StateUpdater, useState } from "preact/hooks";
import { useReadingModal } from "../../context/reading";
import IconChevron from "../../resources/img/icon-chevron.svg";
import IconMenu from "../../resources/img/icon-menu.svg";
import IconHome from "../../resources/img/icon-reading-home.svg";
import { useUser } from "../../context/user";
import BackDrop from "../BackDrop";
import ModalNotification from "../Modal/ModalNotification";
import { createPortal } from "preact/compat";

interface PopControlProps {
  chapterList: ChapterData[];
  curChapter: number;
  curComic: string;
  pageNum: number;
  curPage: number;
  setIsDrag: StateUpdater<boolean>;
  setCurPage: StateUpdater<number>;
  setPageList: StateUpdater<string[]>;
  changeChapter: StateUpdater<number>;
}

const PopControl: FunctionalComponent<PopControlProps> = ({
  chapterList,
  curChapter,
  curComic,
  setCurPage,
  setPageList,
  changeChapter,
}) => {
  const { customRouter, setLegit, isLegit } = useRouter();
  const { isLogIn, logout } = useUser();
  const { isPopControl, popChapter, reset, popBuy, setStuffInfo, popControl } =
    useReadingModal();
  const [isPop, setIsPop] = useState(false);

  return (
    <F>
      {isPop &&
        isLogIn &&
        !isLegit &&
        createPortal(
          <BackDrop
            onClose={() => {
              setIsPop(false);
            }}
            onCallback={() => {
              if (isLogIn) {
                logout();
              }
            }}
          />,
          document.getElementById("back-drop")!
        )}
      {isPop && isLogIn && !isLegit && (
        <ModalNotification
          onClose={() => {
            setIsPop(false);
            if (isLogIn) logout();
          }}
        />
      )}
      <div
        className={
          "fixed z-[30] bottom-0 left-1/2 translate-x-[-50%] h-[50px] max-w-[420px] w-full duration-300 " +
          (isPopControl ? "" : "translate-y-[120%]")
        }
        style={{ backgroundColor: "rgba(0,0,0,.7)" }}
      >
        <div className="flex items-center justify-between h-full w-full">
          <button
            className="mr-2"
            onClick={(e) => {
              if (curChapter > 1) {
                // chapterList count from 0, curChapter count from 1
                setStuffInfo({
                  ...chapterList[curChapter - 2],
                  bookId: curComic,
                });
                if (!chapterList[curChapter - 2].status) {
                  popBuy();
                  return;
                }

                fetch("/api/v1/auth/check")
                  .then((response) => {
                    if (response.status === 401) {
                      setLegit(false);
                      throw new Error("not logged");
                    }
                    if (response.status === 403) {
                      setLegit(true);
                      document.querySelector("#page-1")?.scrollIntoView();
                      setCurPage(1);
                      setPageList([]);
                      changeChapter((prev) => prev - 1);
                      popControl();
                      customRouter.push(
                        `/read/${curComic}/chapter/${curChapter - 1}`,
                        true
                      );
                      route(
                        `/read/${curComic}/chapter/${curChapter - 1}`,
                        true
                      );
                    }
                  })
                  .catch((err) => {});
              }
            }}
          >
            <IconChevron class="h-10 w-10 text-white rotate-180" />
          </button>
          <button
            className="flex flex-col items-center justify-center h-full text-[12px] leading-[12px] text-white"
            onClick={() => {
              customRouter.push("/home");
              route("/home");
            }}
          >
            <div className="">
              <IconHome class="h-6 w-6 text-white" />
            </div>
          </button>
          <button className="ml-2" onClick={popChapter}>
            <IconMenu class="h-10 w-10" />
          </button>
          <button
            className="ml-4"
            onClick={() => {
              // chapterList count from 0, curChapter count from 1
              setStuffInfo({ ...chapterList[curChapter], bookId: curComic });
              if (!chapterList[curChapter].status) {
                popBuy();
                return;
              }

              fetch("/api/v1/auth/check")
                .then((response) => {
                  if (response.status === 401) {
                    setLegit(false);
                    throw new Error("not logged");
                  }
                  if (response.status === 403) {
                    setLegit(true);

                    document.querySelector("#page-1")?.scrollIntoView();
                    setCurPage(1);
                    setPageList([]);
                    changeChapter((prev) => prev + 1);
                    popControl();
                    customRouter.push(
                      `/read/${curComic}/chapter/${curChapter + 1}`,
                      true
                    );
                    route(`/read/${curComic}/chapter/${curChapter + 1}`, true);
                  }
                })
                .catch((err) => {});
            }}
          >
            <IconChevron class="h-10 w-10 text-white" />
          </button>
        </div>
      </div>
    </F>
  );
};

export default PopControl;
