import { NavLinkProps } from "./navLinkProps";

export function NavLink(props: NavLinkProps) {
    return (
        <a {...props} className="text-sm font-medium">{props.children}</a>
    );
}