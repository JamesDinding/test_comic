import { h, FunctionalComponent, Component, ErrorInfo } from "preact";

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
    }

    return this.props.children;
  }
}
