import { h, FunctionComponent, Fragment as F, Fragment } from "preact";
import { useState } from "preact/hooks";
import PurchaseItem from "./PurchaseItem";
import Empty from "./Empty";

interface PurchaseProps {
  purchaseList: Array<{
    title: string;
    date: string;
    coinsCost: number;
    coinsRemained: number;
  }>;
}

const PurchaseList: FunctionComponent<PurchaseProps> = ({ purchaseList }) => {
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
