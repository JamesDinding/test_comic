import { FunctionalComponent, h } from "preact";
import { StateUpdater, MutableRef } from "preact/hooks";
import { defaultLocalStorage } from "../../const";
import CustomLink from "../CustomLink";

interface HomeCategoryListBarProp {
  curCategory: string;
  categories: Array<{ id: number; name: string }>;
}

const CategoryListBar: FunctionalComponent<HomeCategoryListBarProp> = ({
  curCategory,
  categories,
}) => {
  return (
    <div class="category_list_box shrink-0">
      <div class="relative flex overflow-x-scroll no-scrollbar overflow-y-hidden">
        {categories.map((c, i) => {
          return (
            <div className="mx-1 first:ml-0">
              <CustomLink
                href={i ? "/home/" + i : "/home/"}
                className="category-item"
                activeClassName="category-item active"
                // onClick={() => {
                //   // setActiveCategory(i);
                //   const temp = JSON.parse(
                //     localStorage.getItem("sjmh") || defaultLocalStorage
                //   );
                //   temp.home.curCategoryIndex = i;
                //   localStorage.setItem("sjmh", JSON.stringify({ ...temp }));
                // }}
                // class={
                // "category-item" +
                // (i.toString() == curCategory ? " active" : "")
                // }
              >
                {c.name}
              </CustomLink>
              <div
                className={
                  i.toString() == curCategory
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
