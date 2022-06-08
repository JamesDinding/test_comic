import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

const SearchBar = () => {
  const [inputField, setInputField] = useState("");

  const searchComicHandler = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    if (e.keyCode === 13 || e.code === "Enter") setInputField(target.value);
  };

  return (
    <nav className="bg-white search-bar">
      <ul className="flex justify-between items-center px-4 pt-2">
        <li className="cursor-pointer">
          <div>icon</div>
        </li>
        <input
          autoComplete="off"
          placeholder="搜索漫畫"
          className="grow mx-2 w-full h-8 border-2 border-[#dcdfe6] focus:border-rose-200 rounded-xl mb-1 indent-4 placeholder:text-xs "
          onKeyDown={searchComicHandler}
          type="text"
        />
        <li className="cursor-pointer">
          <div>icon</div>
        </li>
      </ul>
    </nav>
  );
};

export default SearchBar;
