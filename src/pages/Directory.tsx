import { h, FunctionalComponent, Fragment as F } from "preact";
import DirectoryContentPage from "../components/Directory/DirectoryContentPage";
import { ReadingProvider } from "../context/reading";

const DirectoryPage: FunctionalComponent = () => {
  return (
    <ReadingProvider>
      <DirectoryContentPage />
    </ReadingProvider>
  );
};

export default DirectoryPage;
