declare type Router = {
  routerStack: string[];
  pop: () => string;
  push: (url: string, replace?: boolean) => void;
};

declare interface RouterContextType {
  customRouter: Router;
  currentRoute: string;
  tc: string;
  settingTc: (arg: string) => void;
  attachment: any;
  attachData: (arg: any) => any;
  tempData: any;
  setTempData: (arg: any) => void;
}
