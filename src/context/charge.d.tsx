declare type PaymentType = {
  id: number;
  name: string;
  type: string;
  index?: number;
};

declare interface AllPaymentType {
  payment: Array<PaymentType>;
}

declare interface SalesItem {
  id: number;
  name: string;
  options?: {
    body: string;
    title: string;
    type: string;
  };
  cash_amount: number;
  token_amount: number;
}

declare interface ChargeContextType {
  payment: PaymentType | null;
  userSelect: SalesItem;
  selectCoins: (obj: any) => void;
  selectPay: (obj: any) => void;
}
