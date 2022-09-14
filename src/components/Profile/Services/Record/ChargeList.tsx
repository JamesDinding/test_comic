import { h, FunctionComponent, Fragment as F } from "preact";
import { useState } from "preact/hooks";
import ChargeItem from "./ChargeItem";
import Empty from "./Empty";

// Array<ChargeItem>  應該要把ChargeItem export 出來用
interface ChargeProps {
  chargeList: Array<{
    id: string;
    date: string;
    coinsCharged: number;
    cashPaid: number;
    status: string;
  }>;
}

const ChargeList: FunctionComponent<ChargeProps> = ({ chargeList }) => {
  return (
    <F>
      {chargeList.length === 0 ? (
        <Empty />
      ) : (
        <F>
          <div className="flex flex-col">
            {chargeList.map((chargeObj, i) => {
              return (
                <div className={``} key={i}>
                  <ChargeItem chargeObj={chargeObj} />
                </div>
              );
            })}
          </div>
        </F>
      )}
    </F>
  );
};

export default ChargeList;
