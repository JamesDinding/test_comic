import { h, FunctionComponent, Fragment as F } from "preact";
import { useState, useEffect } from "preact/hooks";
import ChargeItem from "./ChargeItem";
import Empty from "./Empty";
import { getMyOrders } from "../../../../lib/api";

interface ChargeList {
  chargeList: Array<{
    id: string;
    date: string;
    coinsCharged: number;
    cashPaid: number;
    status: string;
  }>;
}

const ChargeList: FunctionComponent = () => {
  const [chargeList, setChargeList] = useState([]);

  useEffect(() => {
    try {
      getMyOrders().then(({ data }) => {
        setChargeList(data);
      });
    } catch (err: any) {
      console.error(err.message);
    }
  }, []);

  return (
    <F>
      {chargeList.length === 0 ? (
        <Empty />
      ) : (
        <F>
          <div className="flex flex-col bg-white">
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
