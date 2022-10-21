import { h, FunctionalComponent } from "preact";
import { route } from "preact-router";
import { Link } from "preact-router";
import { useReadingModal } from "../../context/reading";
import IconCoin from "../../resources/img/icon-coin.svg";
import IconArrow from "../../resources/img/icon-arrow.svg";

interface PopReturnProps {
  bookId: number;
  title: string;
}

const PopReturn: FunctionalComponent<PopReturnProps> = ({ bookId, title }) => {
  const { isPopControl } = useReadingModal();

  return (
    <div
      className={
        "fixed flex items-center justify-between w-full max-w-[420px] h-[50px] min-h-[50px] px-5 bg-[rgba(0,0,0,.6)] duration-300 " +
        (isPopControl ? "" : "translate-y-[-100%] opacity-0 z-[-999]")
      }
    >
      <div
        className="flex flex-col items-center text-white cursor-pointer"
        onClick={() => {
          route(`/directory/${bookId}`, true);
        }}
      >
        <span className="mb-[.125rem]">
          <IconArrow class="w-[1.125rem] text-white" />
        </span>
        <div className="pt-1 text-[12px] whitespace-nowrap leading-[12px]">
          返回
        </div>
      </div>
      <div className="grow">
        <div className="text-center text-white text-xl book-oneline mx-2">
          {title}
        </div>
      </div>

      <div className="w-6 text-white flex flex-col items-center">
        <Link href="/charge">
          <span>
            <IconCoin class="w-full" />
          </span>
          <div className="w-full mt-[.125rem] text-[12px] whitespace-nowrap leading-[12px]">
            充值
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PopReturn;
