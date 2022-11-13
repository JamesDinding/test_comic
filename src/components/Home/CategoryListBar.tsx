import { FunctionalComponent, h } from "preact";
import { StateUpdater, MutableRef } from "preact/hooks";
import { defaultLocalStorage } from "../../const";

interface HomeCategoryListBarProp {
  curCategory: number;
  onCategoryChanged: StateUpdater<number>;
  categories: Array<{ id: number; name: string }>;
  searchRef: MutableRef<HTMLInputElement>;
  stopShowResult: () => void;
}

const CategoryListBar: FunctionalComponent<HomeCategoryListBarProp> = ({
  curCategory,
  onCategoryChanged,
  categories,
  searchRef,
  stopShowResult,
}) => {
  return (
    <div class="category_list_box shrink-0">
      <div class="relative flex overflow-x-scroll no-scrollbar overflow-y-hidden">
        {categories.map((c, i) => {
          return (
            <div className="mx-1 first:ml-0">
              <a
                href="/home"
                onClick={() => {
                  // setActiveCategory(i);
                  onCategoryChanged(i);
                  const temp = JSON.parse(
                    localStorage.getItem("sjmh") || defaultLocalStorage
                  );
                  temp.home.curCategoryIndex = i;
                  localStorage.setItem("sjmh", JSON.stringify({ ...temp }));
                  searchRef.current.value = "";
                  stopShowResult();
                }}
                class={"category-item" + (i == curCategory ? " active" : "")}
              >
                {c.name}
              </a>
              <div
                className={
                  i == curCategory
                    ? "category-item-derocation"
                    : "invisible h-0"
                }
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryListBar;
