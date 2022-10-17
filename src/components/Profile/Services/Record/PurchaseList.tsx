import { h, FunctionComponent, Fragment as F, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import PurchaseItem from "./PurchaseItem";
import Empty from "./Empty";
import { getMyTransactions } from "../../../../lib/api";

interface PurchaseList {
  purchaseList: Array<{
    title: string;
    date: string;
    coinsCost: number;
    coinsRemained: number;
  }>;
}

const PurchaseList: FunctionComponent = () => {
  const [purchaseList, setPurchaseList] = useState([]);

  useEffect(() => {
    try {
      getMyTransactions().then(({ data }) => {
        console.log(data);
        setPurchaseList(data);
      });
    } catch (err: any) {
      console.error(err.message || "failed");
    }
  }, [getMyTransactions]);

  return (
    <>
      {purchaseList.length === 0 ? (
        <Empty />
      ) : (
        <div className="flex flex-col">
          {purchaseList.map((purchaseObj, i) => {
            return (
              <div className={``} key={i}>
                <PurchaseItem purchaseObj={purchaseObj} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default PurchaseList;
