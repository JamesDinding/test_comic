import { h, FunctionalComponent } from "preact";
import {
  useState,
  useEffect,
  MutableRef,
  StateUpdater,
  useCallback,
} from "preact/hooks";
import { getSearch, getKeywords } from "../../lib/api";

type KeywordItemProps = {
  keyname: string;
  onClickCallback?: (arg: any) => any;
};

const KeywordItem: FunctionalComponent<KeywordItemProps> = ({
  keyname,
  onClickCallback,
}) => {
  return (
    <div
      className="cursor-pointer bg-white mr-2 mb-2.5 p-2.5 border-solid border-[1px] border-[#b5a7d0] rounded-[1.25rem] text-[#79727d] text-sm"
      onClick={onClickCallback?.bind(this, keyname)}
    >
      {keyname}
    </div>
  );
};

interface KeywordSectionProps {
  inputRef: MutableRef<HTMLInputElement>;
  onShow: StateUpdater<boolean>;
  onSearch: StateUpdater<Book[]>;
}

const KeywordSection: FunctionalComponent<KeywordSectionProps> = ({
  inputRef,
  onShow,
  onSearch,
}) => {
  const [keywordList, setKeywordList] = useState<string[]>([
    "家庭",
    "教师",
    "邻居女孩",
    "教师",
    "便利商店",
    "女大学生",
    "人妻",
    "高中生",
    "野外",
    "乱交",
  ]);

  const clickHandler = useCallback(
    (search: string) => {
      inputRef.current.value = search;
      getSearch("keyword=" + search)
        .then((response) => {
          onSearch(response.data);
          onShow(true);
        })
        .catch((err) => {
          console.error(err.message || "failed");
          onSearch([]);
          onShow(true);
        });
    },
    [inputRef.current.value]
  );

  useEffect(() => {
    if (keywordList.length !== 0) return;
    getKeywords()
      .then((response) => {
        console.log(response);
        if (response.error) throw new Error(response.message || "failed");
      })
      .catch((err) => {
        console.error(err);
      });
  }, [keywordList]);

  return (
    <div className="flex flex-wrap items-start max-h-[160px] pt-2.5 px-5 bg-[#fcf6ff] overflow-y-auto no-scrollbar">
      {keywordList.map((keyword, i) => {
        return (
          <KeywordItem
            key={i}
            keyname={keyword}
            onClickCallback={clickHandler}
          />
        );
      })}
    </div>
  );
};

export default KeywordSection;
