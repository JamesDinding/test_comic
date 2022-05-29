import { FunctionalComponent, h } from "preact";
import { useState, StateUpdater } from "preact/hooks";

interface HomeCategoryListBarProp {
    onCategoryChanged: StateUpdater<number>
}

const CategoryListBar: FunctionalComponent<HomeCategoryListBarProp> = ({ onCategoryChanged }) => {
    const [activeCategory, setActiveCategory] = useState(0);

    const [categories] = useState([
        { Name: "推荐", ID: 0 },
        { Name: "剧情", ID: 1 },
        { Name: "同人志", ID: 17 },
        { Name: "角色扮演", ID: 28 },
        { Name: "真人", ID: 15 },
        { Name: "3D", ID: 16 },
        { Name: "学园", ID: 3 },
        { Name: "言情", ID: 12 },
        { Name: "多人", ID: 24 },
        { Name: "游戏CG", ID: 27 },
    ]);

    return (
        <div class="category_list_box shrink-0">
            <div class="relative flex overflow-x-scroll no-scrollbar overflow-y-hidden">
                {categories.map(c => <a href="/home" onClick={() => {
                    setActiveCategory(c.ID)
                    onCategoryChanged(c.ID)
                }} class={"category-item mx-1 first:ml-0" + ((c.ID == activeCategory) ? " active" : "")}>{c.Name}</a>)}
            </div>
        </div >
    );
}

export default CategoryListBar;
