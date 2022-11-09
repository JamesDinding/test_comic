import { h, FunctionalComponent, Component, ErrorInfo } from "preact";
import { route } from "preact-router";

export default class ErrorBoundary extends Component {
  state = { error: null };

  // static getDerivedStateFromError(error: any): object | null {
  //   return { error: error.message };
  // }

  componentDidCatch(error: any, errorInfo: ErrorInfo): void {
    console.error(error);
    this.setState({ error: error.message });
  }

  render() {
    if (this.state.error) {
      console.error("error happened in the app");
      return (
        <div className="w-full text-center mt-10">
          程式发生错误，点击
          <div className="cursor-pointer font-bold" onClick={() => route("/")}>
            返回首页
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
