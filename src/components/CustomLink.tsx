import { h, FunctionalComponent } from "preact";
import { useRouter } from "../context/router";

interface CustomLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
  callback?: () => void;
}

const CustomLink: FunctionalComponent<CustomLinkProps> = ({
  children,
  href,
  className = "",
  activeClassName = "",
  callback,
}) => {
  const { currentRoute, customRouter } = useRouter();

  return (
    <a
      id={"book" + href.split("/").pop()}
      href={href}
      onClick={(e) => {
        const t = e.target as HTMLAnchorElement;
        const target = t.closest("a");

        const container = document.querySelector("#search-section");
        console.log(container);
        if (container) {
          localStorage.setItem(
            "sjmh_search_section_height",
            container?.clientHeight.toString() || "0"
          );
        }

        const temp = document.querySelector("#scroll");
        if (temp) {
          localStorage.setItem(
            "sjmh_scroll_height",
            temp?.scrollTop.toString() || "0"
          );
        }

        if (target) {
          localStorage.setItem("sjmh_scroll_item", target?.id);
        }
        customRouter.push(href);
      }}
      className={currentRoute === href ? activeClassName : className}
    >
      {children}
    </a>
  );
};

export default CustomLink;
