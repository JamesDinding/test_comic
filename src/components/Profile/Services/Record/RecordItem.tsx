import { FunctionalComponent, h } from "preact";

const weekTable = ["週一", "週二", "週三", "週四", "週五", "週六", "週日"];

interface RecordItemProps {
  id?: number; // 每筆購買、充值應該會有流水號之類的？
  date: string;
  amount: number; // 交易金額
  name: string; // 交易的項目名稱
  chapter?: number; // if 購買章節
}

const RecordItem: FunctionalComponent<RecordItemProps> = ({
  id,
  date,
  amount,
  name,
  chapter,
}) => {
  const dateObj = new Date(date);

  return (
    <div className="bg-white w-full text-sm">
      <div className="bg-[#ff978d] text-white py-[.4rem] px-[.6rem]">
        {date}
      </div>
      <div className="flex items-center p-[.6rem] border-b-[1px] border-[#f4f4f4]">
        <div className="shrink text-center text-[.6rem] text-[#a8a8a8] px-4">
          <div>{weekTable[dateObj.getDay() - 1]}</div>
          <div>{date}</div>
        </div>
        <div className="grow ml-4">
          <div className="text-sm overflow-hidden">{name}</div>
          {chapter && (
            <div className="text-[.6rem] text-[#a8a8a8]">{chapter}</div>
          )}
        </div>
        <div className="text-[#ff978d] items-end pr-4">{amount}&nbsp;元</div>
      </div>
    </div>
  );
};

export default RecordItem;
