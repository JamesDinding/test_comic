import { FunctionalComponent, h } from "preact";
import { useState, StateUpdater, useEffect } from "preact/hooks";
import {getCategories} from '../../lib/api';

interface HomeCategoryListBarProp {
    onCategoryChanged: StateUpdater<number>;
    categories:Array<{id:number,name:string}>;
}

const CategoryListBar: FunctionalComponent<HomeCategoryListBarProp> = ({ onCategoryChanged,categories }) => {
    const [activeCategory, setActiveCategory] = useState(0);
    

    // min-h-[36px]
    return (
        <div class="category_list_box shrink-0">
            <div class="relative flex overflow-x-scroll no-scrollbar overflow-y-hidden">
                {categories.map(c => <a href="/home" onClick={() => {
                    setActiveCategory(c.id)
                    onCategoryChanged(c.id)
                }} class={"category-item mx-1 first:ml-0" + ((c.id == activeCategory) ? " active" : "")}>{c.name}</a>)}
            </div>
        </div >
    );
}

export default CategoryListBar;
