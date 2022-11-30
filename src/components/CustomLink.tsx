import { h, FunctionalComponent } from "preact";
import { useRouter } from "../context/router";
import { publish } from "../lib/event";

interface CustomLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
  linkId?: string;
  callback?: () => void;
}

const CustomLink: FunctionalComponent<CustomLinkProps> = ({
  children,
  href,
  className = "",
  activeClassName = "",
  linkId = "",
  callback,
}) => {
  const { currentRoute, customRouter, setTempData, attachData } = useRouter();

  return (
    <a
      id={linkId || "book" + href.split("/").pop()}
      href={href}
      onClick={(e) => {
        const t = e.target as HTMLAnchorElement;
        const target = t.closest("a");

        const container_search = document.querySelector("#search-section");
        const container_category = document.querySelector("#category-section");
        if (container_search) {
          localStorage.setItem(
            "sjmh_search_section_height",
            container_search?.clientHeight.toString() || "0"
          );
        }
        if (container_category) {
          setTempData((prev: any) => {
            const categoryIndex = parseInt(
              currentRoute.split("/").pop() || "1",
              10
            );
            const currentCagetoryId = JSON.parse(localStorage.getItem("sjmh")!)
              .home.categories[categoryIndex - 1].id;

            const t = { ...prev };

            if (
              !currentCagetoryId ||
              !t.CategoryPage ||
              !t.CategoryPage[currentCagetoryId]
            )
              return t;

            t.CategoryPage[currentCagetoryId].container_height =
              container_category?.clientHeight;
            return t;
          });
        }

        const temp_search = document.querySelector("#scroll");
        const temp_category = document.querySelector("#category-scroll");
        if (temp_search && container_search) {
          localStorage.setItem(
            "sjmh_scroll_height",
            temp_search?.scrollTop.toString() || "0"
          );
        }
        if (container_category) {
          setTempData((prev: any) => {
            const categoryIndex = parseInt(
              currentRoute.split("/").pop() || "1",
              10
            );
            const currentCagetoryId = JSON.parse(localStorage.getItem("sjmh")!)
              .home.categories[categoryIndex - 1].id;

            const t = { ...prev };
            if (
              !currentCagetoryId ||
              !t.CategoryPage ||
              !t.CategoryPage[currentCagetoryId]
            )
              return t;

            t.CategoryPage[currentCagetoryId].scroll_height =
              temp_category?.scrollTop || 0;

            return t;
          });
        }

        if (target) {
          localStorage.setItem("sjmh_scroll_item", target?.id);
          const isCategoryTab = target.id.startsWith("category-link");
          attachData(null);
          if (!isCategoryTab) {
            console.log("attach ", target?.id);
            attachData(target?.id);
          }
          publish("memorizePageRef");
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
