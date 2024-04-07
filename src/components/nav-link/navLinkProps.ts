import { ComponentProps } from "react";

export interface NavLinkProps extends ComponentProps<'a'> {
    children: string
}