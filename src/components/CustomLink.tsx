import { h, FunctionalComponent } from "preact";
import { useRouter } from "../context/router";

interface CustomLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
}

const CustomLink: FunctionalComponent<CustomLinkProps> = ({
  children,
  href,
  className = "",
  activeClassName = "",
}) => {
  const { currentRoute, customRouter } = useRouter();

  return (
    <a
      href={href}
      onClick={() => {
        customRouter.push(href);
      }}
      className={currentRoute === href ? activeClassName : className}
    >
      {children}
    </a>
  );
};

export default CustomLink;
