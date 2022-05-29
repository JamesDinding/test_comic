import { h, FunctionalComponent, Fragment } from "preact";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";

import { useWorker } from "../../context/worker";
import RecommendBlock from "./RecommendBlock";

const recommendationBlocks = [
    1, 2, 10077, 10078, 10079, 10080, 10081, 10082, 10083, 10084
];

const recommendationBlocksItemPerRow: {
    [index: number]: number;
} = {
    1: 0,
    2: 3,
    10077: 2,
    10078: 3,
    10079: 2,
    10080: 3,
    10081: 2,
    10082: 3,
    10083: 2,
    10084: 3,
};

const HomeRecommend: FunctionalComponent = () => {
    const { send } = useWorker();
    const [blocks, setBlocks] = useState<Array<RecommendationBlock>>([]);

    useEffect(() => {
        (async () => {
            let res = await send({
                action: "Get",
                data: {
                    url: "/api/v1/content/recommendations?blkID=" + recommendationBlocks.join(","),
                }
            });

            if (res.blocks !== undefined) {
                setBlocks(res.blocks);
            }
        })();
    }, [send]);

    return (
        <div>
            {blocks.map(blk => {
                if (blk.ID == 1) return <></>;
                return (<RecommendBlock BlockID={blk.ID} BlockName={blk.Name} Items={blk.Items} ItemPerRow={recommendationBlocksItemPerRow[blk.ID]} />)
            })}
        </div>
    );
}

export default HomeRecommend;
