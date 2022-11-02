import { Component, ErrorInfo } from "preact";

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error: any): object | null {
    return { error: error.message };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo): void {
    console.log("error happened ");
    this.setState({ error: error.message });
  }

  render() {}
}
