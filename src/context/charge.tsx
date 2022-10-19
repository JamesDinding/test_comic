import { h, FunctionalComponent, createContext } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";

// 支付，支付線路id, 支付線路
const ChargeContext = createContext<ChargeContextType>(null!);

export const ChargeProvider: FunctionalComponent = ({ children }) => {
  const [payment, setPayment] = useState<PaymentType | null>(null);
  const [userSelect, setUserSelect] = useState<SalesItem>(null!);


  const selectCoinsHandler = (obj:any) => {
    setUserSelect(obj);
  };

  const selectPayHandler = (obj:any) => {
    setPayment(obj);
  };

  const value: ChargeContextType = {
    payment,
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
