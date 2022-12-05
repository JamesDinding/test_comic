declare type Router = {
  routerStack: string[];
  pop: () => string;
  push: (url: string, replace?: boolean) => void;
};

declare interface RouterContextType {
  isLegit: boolean;
  setLegit: (arg: boolean) => void;
  isUc: boolean;
  ucQueue: any[];
  ucQ: any[];
  pushUcQ: (arg: string) => void;
  customRouter: Router;
  currentRoute: string;
  tc: string;
  settingTc: (arg: string) => void;
  attachment: any;
  attachData: (arg: any) => any;
  tempData: any;
  setTempData: (arg: any) => void;
  cleanTempData: () => void;
  isLoading: boolean;
  popLoading: () => void;
  shutLoading: () => void;
}
