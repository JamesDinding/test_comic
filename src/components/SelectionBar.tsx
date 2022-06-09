import { FunctionalComponent, h } from "preact";
import { route } from "preact-router";

interface SelectionBarProps {
  destinationArr: Array<{ url: string; title: string; icon: string }>;
}

const SelectionBar: FunctionalComponent<SelectionBarProps> = ({
  destinationArr,
}) => {
  const currentUrl = "/" + window.location.href.split("/").pop();

  return (
    <nav className=" text-sm bg-white">
      <ul className="flex justify-between items-center grow text-center">
        {destinationArr.map((des, i) => {
          let tabCss =
            currentUrl === des.url
              ? "record-tab-active"
              : "record-tab-inactive";
          return (
            <li
              className={`cursor-pointer grow py-2 ${tabCss}`}
              onClick={() => route(des.url)}
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
