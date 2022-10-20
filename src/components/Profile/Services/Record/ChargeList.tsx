import { h, FunctionComponent, Fragment as F } from "preact";
import { useState, useEffect } from "preact/hooks";
import ChargeItem from "./ChargeItem";
import Empty from "./Empty";
import { getMyOrders } from "../../../../lib/api";

// Array<ChargeItem>  應該要把ChargeItem export 出來用
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
        console.log(data);
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
