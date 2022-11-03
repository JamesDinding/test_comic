import { FunctionalComponent, h } from "preact";
import { useState, StateUpdater, useEffect, MutableRef } from "preact/hooks";
import { getCategories } from "../../lib/api";

interface HomeCategoryListBarProp {
  onCategoryChanged: StateUpdater<number>;
  categories: Array<{ id: number; name: string }>;
  searchRef: MutableRef<HTMLInputElement>;
  setShowResult: StateUpdater<boolean>;
}

const CategoryListBar: FunctionalComponent<HomeCategoryListBarProp> = ({
  onCategoryChanged,
  categories,
  searchRef,
  setShowResult,
}) => {
  const [activeCategory, setActiveCategory] = useState(0);

  // min-h-[36px]
  return (
    <div class="category_list_box shrink-0">
      <div class="relative flex overflow-x-scroll no-scrollbar overflow-y-hidden">
        {categories.map((c, i) => {
          return (
            <div className="mx-1 first:ml-0">
              <a
                href="/home"
                onClick={() => {
                  setActiveCategory(i);
                  onCategoryChanged(i);
                  searchRef.current.value = "";
                  setShowResult(false);
                }}
                class={"category-item" + (i == activeCategory ? " active" : "")}
              >
                {c.name}
              </a>
              <div
                className={
                  i == activeCategory
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
