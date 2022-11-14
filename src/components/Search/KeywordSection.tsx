import { h, FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";

type KeywordItemProps = {
  keyname: string;
};

const KeywordItem: FunctionalComponent<KeywordItemProps> = ({ keyname }) => {
  return (
    <div className="bg-white h-5 mr-2 rounded-[1.25rem] text-[#79727d] text-sm">
      {keyname}
    </div>
  );
};

const KeywordSection: FunctionalComponent = () => {
  const [keywordList, setKeywordList] = useState<string[]>([
    "1",
    "12345",
    "1234125",
    "2345",
    "41234",
  ]);

  useEffect(() => {}, []);

  return (
    <div className="h-[160px] py-2.5 px-5 overflow-y-auto no-scrollbar">
      {keywordList.map((keyword, i) => {
        return <KeywordItem key={i} keyname={keyword} />;
      })}
    </div>
  );
};

export default KeywordSection;
