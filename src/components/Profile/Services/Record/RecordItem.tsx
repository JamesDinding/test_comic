import { FunctionalComponent, h } from "preact";

const weekTable = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

interface RecordItemProps {
  id?: number; // 每笔购买、充值应该会有流水号之类的？
  date: string;
  amount: number; // 交易金额
  name: string; // 交易的项目名称
  chapter?: number; // if 购买章节
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
