import { h, FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import Image from "../_Image/image";

interface PageProps {
  pageIndex: number;
  page: string;
}

const Page: FunctionalComponent<PageProps> = ({ page, pageIndex }) => {
  const [parentPending, setParentPending] = useState(true);

  return (
    <div
      id={`page-${pageIndex + 1}`}
      className={"page" + (parentPending ? " min-h-[160px] wait" : "")}
    >
      <Image
        path={page}
        alt=""
        isFullHeight={false}
        setParentPending={setParentPending}
        pendingHeight="min-h-[160px]"
      />
    </div>
  );
};

export default Page;
