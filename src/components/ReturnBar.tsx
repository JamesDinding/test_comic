import { FunctionalComponent, h, Fragment } from "preact";
import IconHome from "../resources/img/footer-home.svg";
import IconChevron from "../resources/img/icon-chevron.svg";
import { Link } from "preact-router";
import Image from "./_Image/image";

interface ReturnBarProps {
  title: string;
}

const ReturnBar: FunctionalComponent<ReturnBarProps> = ({ title }) => {
  return (
    <div className="flex items-center bg-watercolor bg-center bg-no-repeat bg-cover">
      <div className="w-[50px]" onClick={() => history.back()}>
        <span>
          <IconChevron class="h-8 rotate-180" />
        </span>
      </div>
      <div className="grow">
        <div className="text-center text-[#4c4c4c] text-[.9rem]">{title}</div>
      </div>
      <div className="w-[50px]">
        <Link href="/">
          <IconHome class="h-8" />
        </Link>
      </div>
    </div>
  );
};

export default ReturnBar;
