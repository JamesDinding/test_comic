import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { route } from "preact-router";

interface SelectionBarProps {
  destinationArr: Array<{ url: string; title: string }>;
}

const SelectionBar: FunctionalComponent<SelectionBarProps> = ({
  destinationArr,
}) => {
  const initialSection =
    window.location.href.split("/").pop() === "purchase-record" ? 0 : 1;
  const [curSection, setCurSection] = useState(initialSection);

  return (
    <nav className=" p-3 text-sm bg-white">
      <ul className="flex justify-between items-center grow text-center">
        {destinationArr.map((des, i) => {
          let tabCss =
            i === curSection ? "record-tab-active" : "record-tab-inactive";
          return (
            <li
              className={`cursor-pointer grow py-2 ${tabCss}`}
              onClick={() => {
                setCurSection(i);
                route(des.url);
              }}
            >
              <div>{des.title}</div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SelectionBar;
