import { h, FunctionalComponent, Fragment } from "preact";
import { route } from "preact-router";

interface CategoryItemListProps {
    catID: Number
}

const HomeCategoryItemList: FunctionalComponent<CategoryItemListProps> =
    ({ catID }) => {
        return (<>
            {catID}
        </>);
    }

export default HomeCategoryItemList;
