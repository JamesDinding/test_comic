import { h, FunctionalComponent } from "preact";
import { useRef } from "preact/hooks";
import Description from "../components/Directory/Description";
import ChapterHead from "../components/Directory/ChapterHead";
import ChapterList from "../components/Directory/ChapterList";
import ReturnBar from "../components/ReturnBar";
import { ObserverProvider } from "../context/observer";

const DirectoryPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);

  return (
    <div class="grow px-2" ref={containerRef}>
      <ObserverProvider rootElement={containerRef}>
        <ReturnBar title="test" />
        <Description />
        <ChapterHead />
        <ChapterList />
      </ObserverProvider>
    </div>
  );
};

export default DirectoryPage;
