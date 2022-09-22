import { FunctionalComponent, h, Fragment as F } from "preact";
import ReadContentPage from "../components/Read/ReadContentPage";
import { ReadingProvider } from "../context/reading";

const ReadPage: FunctionalComponent = () => {
  return (
    <ReadingProvider>
      <ReadContentPage />
    </ReadingProvider>
  );
};

export default ReadPage;
