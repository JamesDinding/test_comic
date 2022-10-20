import { FunctionalComponent, h } from "preact";
import { route } from "preact-router";
import { StateUpdater, useState } from "preact/hooks";

interface SelectionBarProps {
  tabArr: Array<string>;
  curSelect: number;
  setCurSelect: StateUpdater<number>;
}

const SelectionBar: FunctionalComponent<SelectionBarProps> = ({
  tabArr,
  setCurSelect,
  curSelect,
}) => {
  return (
    <nav className=" text-lg bg-white text-[#6d5694]">
      <ul className="flex justify-around items-center text-center">
        {tabArr.map((tab, i, arr) => {
          return (
            <li
              className={
                "cursor-pointer py-2.5 px-5 tracking-wide  " +
                (curSelect === i ? "border-b-2 border-[#6d5694]" : "opacity-60")
              }
              onClick={() => setCurSelect(i)}
            >
              <div>{tab}</div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SelectionBar;
