import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import EndBottom from "../../../EndBottom";
import Empty from "./Empty";
import RecordItem from "./RecordItem";

interface RecordItemProps {
  id?: number; // 每筆購買、充值應該會有流水號之類的？
  date: string;
  amount: number; // 交易金額
  name: string; // 交易的項目名稱
  chapter?: number; // if 購買章節
}

const ChargeRecord = () => {
  const [data, setData] = useState<Array<RecordItemProps> | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fake: Promise<Array<RecordItemProps> | null> = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve([
            {
              id: 12345,
              date: "2022-12-12",
              amount: 60,
              name: "黑糖饅頭",
              chapter: 1,
            },
          ]);
        }, 1000);
      }
    );

    setIsPending(true);
    fake.then((data) => {
      setData(data);
      setIsPending(false);
    });
  });

  return (
    <>
      <div></div>
      {data?.map((d) => {
        return (
          <RecordItem
            id={d.id}
            date={d.date}
            amount={d.amount}
            name={d.name}
            chapter={d.chapter}
          />
        );
      })}
      <EndBottom />
      {data?.length === 0 && <Empty title="立即充值" url="/charge" />}
    </>
  );
};

export default ChargeRecord;
