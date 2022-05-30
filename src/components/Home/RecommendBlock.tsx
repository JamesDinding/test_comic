import { h, FunctionalComponent, Fragment } from "preact";
import { route } from "preact-router";
import { useEffect } from "preact/hooks";

import { useWorker } from "../../context/worker";
import BookList from "../_Book/List";

import HeadingIcon from "../../resources/img/home-recommand-block-heading.svg";

interface RecommendBlockProps {
    BlockID: number
    BlockName: string
    ItemPerRow: number
    Items: any
}

interface Book {
    ID: number
    Name: string
    Cover: string
}

const RecommendBlock: FunctionalComponent<RecommendBlockProps> = ({ BlockID, BlockName, Items, ItemPerRow }) => {
    return (
        <div class="items my-3">
            <div
                class="relative item-header item-header-bg select-none text-center leading-8 text-sm h-8 tracking-[1rem] flex justify-center items-center">
                <HeadingIcon class="inline h-5 mr-2" />
                {BlockName}
                <a href={"/book-more/" + BlockID}
                    class="block absolute right-4 top-2 text-[10px] text-center font-bold tracking-normal rounded-md bg-[#ff978d] text-white px-1 py-0 leading-[16px]">MORE
                    ▶</a>
            </div>

            <BookList Items={Items} ItemPerRow={ItemPerRow} />
        </div>
    );
}

export default RecommendBlock;
