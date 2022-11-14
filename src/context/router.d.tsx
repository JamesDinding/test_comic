declare type Router = {
  routerStack: string[];
  pop: () => string;
  push: (url: string, replace?: boolean) => void;
};

declare interface RouterContextType {
  customRouter: Router;
  currentRoute: string;
  attachment: any;
  attachData: (arg: any) => any;
}
