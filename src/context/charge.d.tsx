declare type UserSelectType = {
  pay: string;
  p_id: string;
  p_way: string;
  coins: string;
  cost: number;
};

declare type PaymentType = {
  pay: string;
  p_id: string;
  p_way: Array<string>;
};

declare interface AllPaymentType {
  payments: Array<PaymentType>;
}

declare interface ChargeContextType {
  payments: Array<PaymentType> | null;
  userSelect: UserSelectType;
  selectCoins: (coins: string, cost: number) => void;
  selectPay: (pay: string, p_id: string, p_way: string) => void;
}
