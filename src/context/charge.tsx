import { h, FunctionalComponent, createContext } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";

// 支付，支付線路id, 支付線路
const ChargeContext = createContext<ChargeContextType>(null!);

export const ChargeProvider: FunctionalComponent = ({ children }) => {
  const [payments, setPayments] = useState<Array<PaymentType> | null>(null);
  const [userSelect, setUserSelect] = useState<UserSelectType>({
    pay: "",
    p_id: "",
    p_way: "",
    coins: "0",
    cost: 0,
  });

  useEffect(() => {
    //fetch payment information
    const fakePromise = new Promise<Array<PaymentType> | null>(
      (resolve, reject) => {
        setTimeout(() => {
          resolve([
            {
              pay: "支付寶",
              p_id: "12345",
              p_way: ["线路名称 1", "线路名称 2", "线路名称 3", "线路名称 4"],
            },
            {
              pay: "微信",
              p_id: "23456",
              p_way: ["线路名称 1", "线路名称 2", "线路名称 3", "线路名称 4"],
            },
            {
              pay: "雲散服",
              p_id: "34567",
              p_way: ["线路名称 1", "线路名称 2", "线路名称 3", "线路名称 4"],
            },
            {
              pay: "GASH",
              p_id: "45678",
              p_way: [
                "线路名称 1",
                "线路名称 2",
                "线路名称 3",
                "线路名称 4",
                "线路名称 5",
                "线路名称 6",
              ],
            },
          ]);
        }, 2000);
      }
    );

    fakePromise.then((res) => {
      setPayments(res);
    });
  });

  const selectCoinsHandler = (coins: string, cost: number) => {
    setUserSelect((prev) => ({ ...prev, coins, cost }));
  };

  const selectPayHandler = (pay: string, p_id: string, p_way: string) => {
    setUserSelect((prev) => ({ ...prev, pay, p_id, p_way }));
  };

  const value: ChargeContextType = {
    payments,
    userSelect,
    selectCoins: selectCoinsHandler,
    selectPay: selectPayHandler,
  };

  return (
    <ChargeContext.Provider value={value}>{children}</ChargeContext.Provider>
  );
};

export function useCharge() {
  return useContext<ChargeContextType>(ChargeContext);
}
